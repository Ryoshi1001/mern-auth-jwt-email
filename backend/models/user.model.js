import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true, 
    unique: true, 
  }, 
  email: {
    type: String, 
    required: true, 
    unique: true, 
  },
  password: {
    type: String, 
    require: true, 
  }, 
  lastLogin: {
    type: Date, 
    default: Date.now()
  },
  isVerified: {
    type: Boolean, 
    default: false, 
  }, 
  // password token can be updated if user updates password
  resetPasswordToken: String, 
  // to make secure further expires in @1hr:
  resetPasswordExpiresAt: Date, 
  // verification token for account verification: 
  verificationToken: String, 
  // to make sure further expires in a few hours: 
  verificationTokenExpiresAt: Date, 
}, {timestamps: true})

export const User = mongoose.model("User", userSchema); 

 