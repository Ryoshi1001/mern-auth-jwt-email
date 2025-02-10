import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const generateTokenSetCookies = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn: "7d"})

  //express res.cookie
  res.cookie("token", token, {
    // protect against XSS attacks
    httpOnly: true, 
    // sameSite for csrf attacks
    sameSite: 'strict', 
    secure: process.env.NODE_ENV === "production", 
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  })

  return token; 
}