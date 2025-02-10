import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import { dbConnection } from './config/database.js'
//for tailwind css
import path from 'path'

dotenv.config()

const PORT = process.env.PORT || 5000; // Define PORT here, after dotenv.config() or endpoints dont work app crashes

const app = express()

//Middleware
// Middleware to serve static files
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.static(path.join(path.resolve(), 'backend')));

app.use(express.json()) // allows parsing of incoming JSON payload: req.body

// routes
app.use('/api/auth', authRoutes)
// Route to serve email.html


app.listen(PORT, () => {
  dbConnection()
  console.log(`App listening on PORT: ${PORT}`)
})

