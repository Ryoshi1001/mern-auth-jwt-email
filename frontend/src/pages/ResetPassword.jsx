import { m, LazyMotion, domAnimation } from 'framer-motion';
import Input from '../components/Input';
import { Loading02Icon, LockPasswordIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error('Error passwords do not match.');
        return;
      } else {
        await resetPassword(password, token);
        toast.success('Password reset successful', { duration: 3000 });
        navigate('/');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.log('Error passwords do not match: ', error);
      toast.error(error.message || 'Error resetting password');
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
            onSubmit={handleResetPassword}
            className="text-color1 flex flex-col gap-3 p-4 sm:p-8"
          >
            <div className="text-center text-xl font-bold text-color1">
              Reset Password
            </div>

            <Input
              icon={LockPasswordIcon}
              type="text"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              icon={LockPasswordIcon}
              type="text"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && (
              <div className="text-sm error-text font-bold pt-1">{error}</div>
            )}

            {message && (
              <div className="text-sm error-text font-bold pt-1">{message}</div>
            )}

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
                'Set new password'
              )}
            </m.button>
          </form>
        </m.div>
      </LazyMotion>
    </>
  );
};

export default ResetPassword;
