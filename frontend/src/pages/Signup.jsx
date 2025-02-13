import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LockPasswordIcon,
  Mail01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';

import Input from '../components/Input';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <motion.div
        className=" h-auto w-full sm:max-w-md z-10 rounded-xl bg-[#fff] backdrop-blur-xl backdrop-filter shadow-xl bg-opacity-100 overflow-hidden"
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
          onSubmit={handleSignup}
          className="text-color1 border-1 border-b-0 rounded-tr-xl rounded-tl-xl border-[#FF6B6B] flex flex-col gap-3 p-4 sm:p-8 pb-4 pt-4"
        >
          <div className="text-center text-xl font-bold text-color1">
            Auth App Signup Form
          </div>

          <Input
            label="UserName"
            icon={UserIcon}
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            icon={Mail01Icon}
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            icon={LockPasswordIcon}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {password.length ? (
            <PasswordStrengthIndicator password={password} />
          ) : (
            ''
          )}

          <motion.button
            type="submit"
            className="bg-[#FF6B6B] text-[#fff] font-bold rounded-lg p-4 cursor-pointer shadow-lg focus:outline-none focus:ring-[#ff5e5e] focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 transition-duration-200 hover:bg-[#ff5e5e]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            SignUp
          </motion.button>
        </form>
        <div className="flex flex-row gap-3 items-center justify-center bg-gray-900 rounded-br-xl rounded-bl-xl py-8 text-gray-300">
          <p>Already have an account?</p>
          <Link to={'/login'} className="text-color1 hover:underline">
            Log in
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Signup;
