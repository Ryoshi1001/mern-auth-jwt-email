import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import { dbConnection } from './config/database.js'
//for tailwind css
import path from 'path'
//for check-auth token
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = process.env.PORT || 5000; // Define PORT here, after dotenv.config() or endpoints dont work app crashes

const app = express()
const __dirname = path.resolve()

//Middleware
// Middleware to serve static files
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : "http://localhost:5173",
  credentials: true
}));

app.use(express.json()) // allows parsing of incoming JSON payload: req.body
app.use(cookieParser()) // allow parsing of incoming cookies: req.cookies.token

// routes
app.use('/api/auth', authRoutes)
// Route to serve email.html

//makes front end static files in production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}

app.listen(PORT, () => {
  dbConnection()
  console.log(`App listening on PORT: ${PORT}`)
})

