import { useState } from 'react';
import { Link } from 'react-router-dom';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import Input from '../components/Input';
import {
  Loading02Icon,
  LockPasswordIcon,
  Mail01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = false;
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <>
   <LazyMotion features={domAnimation}>
   <m.div
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
          onSubmit={handleLogin}
          className="text-color1 border-1 border-b-0 rounded-tr-xl rounded-tl-xl border-[#FF6B6B] flex flex-col gap-3 p-4 sm:p-8 pb-4 pt-4"
        >
          <div className="text-center text-xl font-bold text-color1">Login</div>

          <Input
            label="Email"
            icon={Mail01Icon}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Pasword"
            icon={LockPasswordIcon}
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link
            to={'/forgot-password'}
            className="text-color1 hover:underline text-sm"
          >
            Forgot password?
          </Link>

          <m.button
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
              'Login'
            )}
          </m.button>
        </form>
        <div className="flex flex-row gap-3 items-center justify-center bg-gray-900 rounded-br-xl rounded-bl-xl py-8 text-gray-300">
          <p>Don't an account?</p>

          <Link to={'/signup'} className="text-color1 hover:underline">
            Sign up
          </Link>
        </div>
        </m.div>
        </LazyMotion>
    </>
  );
};

export default Login;
