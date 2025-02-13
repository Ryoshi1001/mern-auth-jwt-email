import { motion } from 'framer-motion'
import PropTypes from 'prop-types'


const BackgroundCircles1 = ({size, color, delay, top, left, right, bottom}) => {
  return (
    <motion.div
  className={`opacity-20 blur-xl absolute rounded-full ${color} ${size} ${delay}opacity-20`}
  style={{ top, left, right, bottom }}
  animate={{
    x: ["0%", "100%", "0%"], 
    y: ["0%", "100%", "0%"], 
    rotate: [0, 360], 
  }}
  transition={{
    duration: 24, 
    ease: 'linear', 
    repeat: Infinity, 
    delay, 
  }}
  aria-hidden="true"
  
    >background circle</motion.div>
  )
}

BackgroundCircles1.PropTypes = {
  size: PropTypes.string.isRequired, 
  color: PropTypes.string.isRequired, 
  delay: PropTypes.number.isRequired, 
  top: PropTypes.number.isRequired, 
  left: PropTypes.number.isRequired, 
  right: PropTypes.number.isRequired, 
  bottom: PropTypes.number.isRequired, 
}

export default BackgroundCircles1