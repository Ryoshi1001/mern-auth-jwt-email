import express from 'express'
import { signup, login, logout, verifyEmail } from '../controllers/auth.controllers.js'

const router = express.Router()

// routes for authentication
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

// endpoint for user to enter verification code: 
router.post('/verify-email', verifyEmail)

export default router; 