import { m, LazyMotion, domAnimation } from 'framer-motion';
import Input from '../components/Input';
import {
  ArrowLeft04Icon,
  Loading02Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [isSubmitted, setIsSubmitted] = useState();

  const { forgotPassword, error, isLoading } = useAuthStore();

  const handleForgotPasswordLink = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true)
      toast.success('Email password link sent successfully', {
        duration: 3000,
      });
    } catch (error) {
      console.log('Error sending password reset link', error);
    }
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
          {!isSubmitted ? (
            <form
              onSubmit={handleForgotPasswordLink}
              className="text-color1 border-1 border-b-0 rounded-tr-xl rounded-tl-xl border-[#FF6B6B] flex flex-col gap-3 p-4 sm:p-8"
            >
              <div className="text-center text-xl font-bold text-color1">
                Forgot Password?
              </div>

              <div className="text-center text-sm">
                Enter your email address and we will send you a link to reset
                your password.
              </div>

              <Input
                icon={Mail01Icon}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {error && (
                <div className="text-sm error-text font-bold pt-1">{error}</div>
              )}

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
                  'Send Reset Link'
                )}
              </m.button>
            </form>
          ) : (
            <form
              onSubmit={handleForgotPasswordLink}
              className="text-color1 border-1 border-b-0 rounded-tr-xl rounded-tl-xl border-[#FF6B6B] flex flex-col gap-3 p-4 sm:p-8"
            >
              <div className="text-center text-xl font-bold text-color1">
                Forgot Password?
              </div>

              <div className="accent-color2 w-fit mx-auto rounded-full p-3">
                <HugeiconsIcon
                  icon={Mail01Icon}
                  size={24}
                  color="#fff"
                  strokeWidth={1.5}
                  className="mx-auto"
                />
              </div>

              <div className="text-center text-sm">
                If an account exist for {email} you will receive a password link
                shortly.
              </div>
            </form>
          )}

          <div className="flex flex-row gap-3 items-center justify-center bg-gray-900 rounded-br-xl rounded-bl-xl py-8 text-gray-300">
            <HugeiconsIcon
              icon={ArrowLeft04Icon}
              size={24}
              color="currentColor"
              strokeWidth={0}
              className=""
            />

            <Link to={'/signup'} className="text-color1 hover:underline">
              Back to Login
            </Link>
          </div>
        </m.div>
      </LazyMotion>
    </>
  );
};

export default ForgotPassword;
