import { m, LazyMotion, domAnimation } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar01Icon,
  Loading02Icon,
  Mail01Icon,
  Time02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logout successful', { duration: 3000 });
    navigate('/login');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: 'numeric',
      year: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };

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
        <div className=" rounded-tr-xl rounded-tl-xl flex flex-col gap-3 p-4 sm:p-8 pb-4 pt-4">
          <div className="text-center text-xl font-bold text-color1">
            User Dashboard
          </div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="input-style  flex flex-col gap-3 border-2 rounded-lg p-3"
          >
            <h3 className="font-bold">User Profile</h3>
            <div className="flex gap-3 items-center">
              <HugeiconsIcon
                icon={UserIcon}
                size={24}
                color="#EDC5FF"
                strokeWidth={1.5}
              />
              <div>{user.name}</div>
            </div>
            <div className="flex gap-3 items-center">
              <HugeiconsIcon
                icon={Mail01Icon}
                size={24}
                color="#EDC5FF"
                strokeWidth={1.5}
              />
              <div>{user.email}</div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="input-style flex flex-col gap-3 border-2 rounded-lg p-3"
          >
            <h3 className="font-bold">User Activity</h3>
            <h3 className="">Last Login</h3>
            <div className="flex gap-3 items-center">
              <HugeiconsIcon
                icon={Time02Icon}
                size={24}
                color="#EDC5FF"
                strokeWidth={1.5}
              />
              {formatDate(user.lastLogin)}
            </div>
            <h3 className="">Joined</h3>
            <div className="flex gap-3 items-center">
              <HugeiconsIcon
                icon={Calendar01Icon}
                size={24}
                color="#EDC5FF"
                strokeWidth={1.5}
              />
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </m.div>

          <m.button
            onClick={handleLogout}
            className="button-style w-full text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
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
              'Logout'
            )}
          </m.button>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default Homepage;
