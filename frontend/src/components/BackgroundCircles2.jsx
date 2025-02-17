import { m } from 'framer-motion';
import PropTypes from 'prop-types';

const BackgroundCircles2 = ({
  size,
  color,
  delay, 
  top,
  left,
  right,
  bottom,
}) => {
  return (
    <m.div
      className={`opacity-30 backdrop-blur-lg blur-lg absolute rounded-full ${color} ${size}`}
      style={{ top, left, right, bottom }}
      animate={{
        x: ['100%', '0%', '100%'],
        y: ['100%', '0%', '100%'],
      }}
      transition={{
        duration: 30,
        ease: 'linear',
        repeat: Infinity,
        delay
      }}
      aria-hidden="true"
    />
  );
};

BackgroundCircles2.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired, 
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
};

export default BackgroundCircles2;