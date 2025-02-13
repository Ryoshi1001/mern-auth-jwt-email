import { HugeiconsIcon } from '@hugeicons/react';
import { CancelCircleIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import PropTypes from 'prop-types'

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: 'At least 6 characters', met: password.length >= 6 },
    { label: 'Container uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains a number', met: /\d/.test(password) },
    {
      label: 'Contains a special character',
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div>
      {criteria.map((item) => (
        <div className='flex flex-row items-center gap-1 text-sm' key={item.label}>
          {item.met ? (
            <HugeiconsIcon
              icon={CheckmarkCircle01Icon}
              size={12}
              color="#4bb543"
              strokeWidth={1.5}
            />
          ) : (
            <HugeiconsIcon
              icon={CancelCircleIcon}
              size={12}
              color="currentColor"
              strokeWidth={1.5}
            />
          )}
          <small className={item.met ? `text-[#4bb543]` : `text-color1` }>
            {item.label}
          </small>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) {
      strength++;
    }
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) {
      strength++;
    }
    if (pass.match(/\d/)) {
      strength++;
    }
    if (pass.match(/[^A-Za-z0-9]/)) {
      strength++;
    }
    return strength;
  };

  const strength = getStrength(password);

  const strengthColor = (strength) => {
    if(strength === 0) return "bg-red-400"
    if(strength === 1) return "bg-red-300"
    if(strength === 2) return "bg-yellow-500"
    if(strength === 3) return "bg-yellow-400"
    return "bg-green-400"; 
  }; 

  const textStrength = (strength) => {
    if (strength === 0) {
      return 'Very Weak';
    }
    if (strength === 1) {
      return 'Weak';
    }
    if (strength === 2) {
      return 'Fair';
    }
    if (strength === 3) {
      return 'Good';
    } else {
      return 'Strong';
    }
  };

  return (
    <div className='flex flex-col gap-1'>
      <div className="flex flex-row justify-between">
        <p>Password strength</p>
        <p>{textStrength(strength)}</p>
      </div>
      <div className='flex gap-[1px]'>
        {[...Array(4)].map((_, index) => (
          <div 
          key={index}
          className={`h-1 w-1/4 rounded-full transition-colors duration-300
            ${index < strength ? strengthColor(strength) : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>
      <PasswordCriteria password={password}/>
    </div>
  );
};

PasswordCriteria.propTypes = {
  password: PropTypes.string.isRequired
}
PasswordStrengthIndicator.propTypes = {
  password: PropTypes.string.isRequired
}

export default PasswordStrengthIndicator;
