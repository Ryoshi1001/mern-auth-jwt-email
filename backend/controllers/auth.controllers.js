import { User } from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateTokenSetCookies } from '../utils/generateTokenSetCookies.js'
import { sendVerificationEmail } from '../mailtrap/sendVerificationEmail.js'

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

export const login = async (req, res) => {
  res.json({
    data: "login endpoint"
  })
}

export const logout = async (req, res) => {
  res.json({
    data: "logout endpoint"
  })
}