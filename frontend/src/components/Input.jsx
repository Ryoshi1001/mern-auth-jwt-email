import { HugeiconsIcon } from '@hugeicons/react';
import PropTypes from 'prop-types';

const Input = ({ icon, label, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="name">{label}</label>
      <div className="relative">
        <div className='absolute flex items-center left-0 inset-y-0 pl-3 pointer-events-none'>
          <HugeiconsIcon
            icon={icon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
          />
        </div>

        <input
          {...props}
          className="border pl-11 flex flex-row items-center outline-none w-full p-3 rounded-lg pr-3 focus:ring-1 transition-duration-300"
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
