import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  // res.cookie("token", token,: .token at end of req.cookies.token is "token" name if name "jwt" then would be req.cookies.jwt
  const token = req.cookies.token
  if(!token) return res.status(401).json({success: false, message: "Unauthorized - no token provided"})
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(!decoded){
      return res.status(401).json({success: false, message: "Unauthorized - invalid token"})
    }

    req.userId = decoded.userId

    next()
  } catch (error) {
    console.log("Error in verifyToken middleware function: ", error)
    res.status(500).json({success: false, message: "Server error"})
  }
}