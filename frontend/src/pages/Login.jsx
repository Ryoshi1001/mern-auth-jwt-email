import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import Input from '../components/Input';
import {
  Loading02Icon,
  LockPasswordIcon,
  Mail01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful', { duration: 3000 });
      navigate('/');
    } catch (error) {
      console.log('Error logging in: ', error);
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
            onSubmit={handleLogin}
            className=" rounded-tr-xl rounded-tl-xl flex flex-col gap-3 p-4 sm:p-8 pb-4 pt-4"
          >
            <div className="text-center text-xl font-bold text-color1">
              Welcome Back
            </div>

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

            {error && (
              <div className="text-sm error-text font-bold pt-1">{error}</div>
            )}

            <Link
              to={'/forgot-password'}
              className="text-color1 hover:underline text-sm"
            >
              Forgot password?
            </Link>

            <m.button
              type="submit"
              className="button-style text-center cursor-pointer w-full]"
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
                'Login'
              )}
            </m.button>
          </form>
          <div className="flex flex-row gap-3 items-center justify-center bg-gray-900 py-8 text-[#fff]">
            <p>Don't an account?</p>

            <Link to={'/signup'} className="link-style hover:underline">
              Sign up
            </Link>
          </div>
        </m.div>
      </LazyMotion>
    </>
  );
};

export default Login;
