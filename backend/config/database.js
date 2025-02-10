import mongoose from "mongoose";

export const dbConnection = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB); 
    console.log(`Connected To MongoDB: ${conn.connection.host}`)
  } catch (error) {
    console.log(`Error Connecting To MongoDB: ${error.message}`)
    process.exit(1); 
  }
}