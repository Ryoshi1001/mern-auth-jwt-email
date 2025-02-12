import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import dotenv from 'dotenv'

import { User } from '../models/user.model.js'
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateTokenSetCookies } from '../utils/generateTokenSetCookies.js'
import { passwordResetSuccessEmail, sendResetPasswordEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emailFunctions.js'

dotenv.config()

export const signup = async (req, res) => {
  // postman to test endpoints
  // user will send values: app.use(express.json()) needed for req.body to work. 
  const {email, name, password} = req.body; 

  try {
    // validation check: for inputs
    if (!email || !name || !password) {
      throw new Error("All fields are required to signup.")
    }

    // validation check: if user already exists in DB: 
    const userAlreadyExists = await User.findOne({email}); 

    // if user exists throw error
    if(userAlreadyExists){
      throw new Error("User already exists")
    }

    // passes validation: hash password user makes, generate verification token
    const hashedPassword = bcryptjs.hashSync("L35c%#@", 10)

    // generate verificationToken
    const verificationToken = generateVerificationToken() 

    // create user
    const user = new User({
      email: email, 
      password: hashedPassword, 
      name: name, 
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 7 * 60 * 60 * 1000 
    })

    // save user to DataBase
    await user.save()
    
    // authenticate in client by creating token JWT
    generateTokenSetCookies(res, user._id); 

    //send verification email here after user and token made
    await sendVerificationEmail(user.email, verificationToken, user.name)

    res.status(201).json({
      success: true, 
      message: "User created successfully", 
      user: {
        ...user._doc, 
        password: undefined, 
      }
    })
  } catch (error) {
    res.status(400).json({success: false, message: error.message})
  }
}

export const verifyEmail = async (req, res) => {
  const { code } = req.body

  try {
    const user = await User.findOne({
      verificationToken : code, 
      verificationTokenExpiresAt: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({success: false, message: "Invalid or expire verification code"})
    } 

    // update and remove items from DB
    user.isVerified = true; 
    user.verificationToken = undefined; 
    user.verificationTokenExpiresAt = undefined; 

    await user.save(); 

    await sendWelcomeEmail(user.email, user.name)

    res.status(200).json({
      success: true, 
      message: "User verified successfully", 
      user: {
        ...user._doc, 
        password: undefined, 
      }
    })
  } catch (error) {
    console.log("Error in verifyEmail Controller", error)
    res.status(500).json({success: false, message: error.message})
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body; 

  try {
    const user = await User.findOne({email})

    if(!user){
      return res.status(400).json({success: false, message: "Invalid credentials"})
    }

    const isPassWordValid = bcryptjs.compareSync("L35c%#@", user.password)

    if(!isPassWordValid){
     console.log("password not valid")
     return res.status(400).json({ success: false, message: "Invalid password"}) 
    }

    generateTokenSetCookies(res, user._id); 

    user.lastLogin = Date.now()

    await user.save()

    res.status(200).json({
      success: true,  
      message: "Login success", 
      user: {
        ...user._doc, 
        password: undefined, 
      }
    })

  } catch (error) {
    console.log("Error in login controller", error); 
    throw new Error(`Error logging in ${error}`)
  }
}

export const logout = async (req, res) => {
  res.clearCookie("token")
  res.status(200).json({
    success: true, 
    message: "Logged out successfully"
  })
}

export const forgotPassword = async(req, res) => {
  const {email} = req.body; 

  try {
    const user = await User.findOne({email})

    if(!user) {
      return res.status(400).json({status: false, message: "Invalid email"})
    }

    // reset token
    const resetToken = crypto.randomBytes(20).toString("hex"); 
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

    user.resetPasswordToken = resetToken
    user.resetPasswordExpiresAt = resetTokenExpiresAt

    await user.save(); 

    await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/forgot-password/${resetToken}`)

    res.status(200).json({
      success: true, 
      message: "Forgot password email sent to your email",
    })
  } catch (error) {
    console.log("Error in forgot password function", error.message)
    res.status(400).json({status: false, message: error.message})
  }
}

export const resetPassword = async(req, res) => {
  try {
    const {token} = req.params;
    const {password} = req.body;  

    const user = await User.findOne({
      resetPasswordToken: token, 
      resetPasswordExpiresAt: {$gt: Date.now()}
    })

    if(!user){
      return res.status(400).json({status: false, message: "Invalid or expired reset token"})
    }

    const hashedPassword = bcryptjs.hashSync("L35c%#@", 10)

    user.password = hashedPassword; 
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresAt = undefined

    await user.save()

    await passwordResetSuccessEmail(user.email , user.name)

    res.status(200).json({success: true, message: "Password reset successfully"})
  } catch (error) {
    console.log("Error in reset password function: ", error)
    res.status(400).json({success: false, message: error.message})
  }
}