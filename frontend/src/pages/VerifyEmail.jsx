import { useEffect, useRef, useState } from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Loading02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { verifyEmail, error, isLoading } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // handle user pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || '';
      }
      setCode(newCode);

      // focus on last non-empty input or first empty input
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // move focus to next input when value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    console.log(`Verification code submitted: ${verificationCode}`);
    try {
      await verifyEmail(verificationCode);
      navigate('/');
      toast.success('Email verified successfully', {
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LazyMotion features={domAnimation}>
        <m.div
          className="h-auto w-full sm:max-w-md z-10 rounded-xl card-bg shadow-xl bg-opacity-100 overflow-hidden"
          initial={{ opacity: 0, y: 80 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="text-color1 flex flex-col gap-3 p-4 sm:p-8 pb-4 pt-4"
          >
            <div className="text-center text-xl font-bold text-color1">
              Verify Email
            </div>

            <p className="text-center">
              Enter the 6-digit code sent to your email address.
            </p>

            <div className="flex flex-row justify-between py-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="number"
                  value={digit}
                  max="9"
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="text-[#fff] w-12 h-12 border rounded-lg accent-color2 text-center shadow-lg  font-bold focus:outline-none focus:ring-[#2B2580] focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fff] transition-duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              ))}
            </div>

            {error && <p className="text-sm error-text font-bold">{error}</p>}

            <m.button
              type="submit"
              className="button-style text-center w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <HugeiconsIcon
                  icon={Loading02Icon}
                  size={24}
                  color="#FFE8FF"
                  strokeWidth={1.5}
                  className="animate-spin mx-auto"
                />
              ) : (
                'Verify Email'
              )}
            </m.button>
          </form>
        </m.div>
      </LazyMotion>{' '}
    </>
  );
};

export default VerifyEmail;
