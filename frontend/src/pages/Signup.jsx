import { m, LazyMotion, domAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Loading02Icon,
  LockPasswordIcon,
  Mail01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import Input from '../components/Input';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signup, error, isLoading, isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      toast.success('Signup successful check email for verification code', {
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/verify-email');
    }
  }, [isAuthenticated, navigate]);

  return (
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
          onSubmit={handleSignup}
          className=" rounded-tr-xl rounded-tl-xl flex flex-col gap-3 p-4 sm:p-8 pb-4 pt-4"
        >
          <div className="text-center text-xl font-bold text-color2">
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

          {error && (
            <div className="text-sm error-text font-bold pt-1">{error}</div>
          )}

          {password.length ? (
            <PasswordStrengthIndicator password={password} />
          ) : (
            ''
          )}

          <m.button
            type="submit"
            className="button-style text-center cursor-pointer"
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
              'Signup'
            )}
          </m.button>
        </form>
        <div className="flex flex-row gap-3 items-center justify-center bg-gray-900 py-8 text-[#fff]">
          <p>Already have an account?</p>
          <Link to={'/login'} className="hover:underline link-style">
            Log in
          </Link>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default Signup;
