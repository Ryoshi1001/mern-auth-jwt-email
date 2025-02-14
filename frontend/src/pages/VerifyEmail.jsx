import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Loading02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

const VerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const isLoading = false;

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
      setCode(newCode)

      // move focus to next input when value is entered
      if(value && index < 5){
        inputRefs.current[index + 1].focus()
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const verificationCode = code.join(""); 
    console.log(`Verification code submitted: ${verificationCode}`)
  }

  // Auto-submit if all inputs are filled
  useEffect(() => {
    if(code.every(digit => digit !== "")){
      handleSubmit(new Event("submit")); 
    }
  },[code])
  


  return (
    <>
      <motion.div
        className=" h-auto w-full sm:max-w-md z-10 rounded-xl bg-[#fff] backdrop-blur-xl backdrop-filter shadow-xl bg-opacity-100 overflow-hidden"
        initial={{ opacity: 0, y: -80 }}
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
        className="text-color1 border-1 border-b-0 rounded-tr-xl rounded-tl-xl border-[#FF6B6B] flex flex-col gap-3 p-4 sm:p-8 pb-4 pt-4">
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
                className="text-[#fff] w-12 h-12 border rounded-lg accent-color2 text-center shadow-lg  font-bold focus:outline-none focus:ring-[#ff5e5e] focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fff] transition-duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            ))}
          </div>

          <motion.button
            type="submit"
            className="bg-[#FF6B6B] text-[#fff] font-bold rounded-lg p-4 cursor-pointer shadow-lg focus:outline-none focus:ring-[#ff5e5e] focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fff] transition-duration-200 hover:bg-[#ff5e5e]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <HugeiconsIcon
                icon={Loading02Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="animate-spin mx-auto"
              />
            ) : (
              'Verify Email'
            )}
          </motion.button>
        </form>
      </motion.div>
    </>
  );
};

export default VerifyEmail;
