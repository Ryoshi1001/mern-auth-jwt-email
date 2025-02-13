import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const BackgroundCircles2 = ({size, color, delay, top, left, right, bottom}) => {
  return (
    <motion.div
  className={`opacity-20 blur-xl absolute rounded-full ${color} ${size} ${delay}opacity-20`}
  style={{ top, left, right, bottom }}
  animate={{
    x: ["100%", "0%", "100%"], 
    y: ["100%", "0%", "100%"], 
    rotate: [0, 360], 
  }}
  transition={{
    duration: 20, 
    ease: 'linear', 
    repeat: Infinity, 
    delay, 
  }}
  aria-hidden="true"
  
    >background circle</motion.div>
  )
}

BackgroundCircles2.PropTypes = {
  size: PropTypes.string.isRequired, 
  color: PropTypes.string.isRequired, 
  delay: PropTypes.number.isRequired, 
  top: PropTypes.number.isRequired, 
  left: PropTypes.number.isRequired, 
  right: PropTypes.number.isRequired, 
  bottom: PropTypes.number.isRequired, 
}

export default BackgroundCircles2