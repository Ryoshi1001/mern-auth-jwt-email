import express from 'express'
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword } from '../controllers/auth.controllers.js'

const router = express.Router()

// routes for authentication
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

// endpoint for user to enter verification code: 
router.post('/verify-email', verifyEmail)

router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword)

export default router; 