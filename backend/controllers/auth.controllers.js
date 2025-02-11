import { User } from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateTokenSetCookies } from '../utils/generateTokenSetCookies.js'
import { sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emailFunctions.js'

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
  const {email, password} = req.body; 

  try {
    const user = await User.findOne({email, password})

    if(!user && !email){
      return res.status(400).json({success: false, message: "Incorrect email or password"})
    }

    generateTokenSetCookies(res, user._id); 

    user.lastLogin = Date.now()

    await user.save()

    res.status(200).json({
      status: success, 
      message: "Login success", 
      user: {
        ...user._doc, 
        password: undefined, 
      }
    })

  } catch (error) {
    console.log("Error in login controller", error.message); 
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