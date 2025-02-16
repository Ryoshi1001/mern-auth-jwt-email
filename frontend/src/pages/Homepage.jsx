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
  const navigate = useNavigate()


  const handleLogout = () => {
    logout()
    toast.success("Logout successful")
    navigate('/login')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
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
        className="h-auto w-full sm:max-w-md z-10 rounded-xl bg-[#fff] backdrop-blur-xl backdrop-filter shadow-xl bg-opacity-100 overflow-hidden"
        initial={{ opacity: 0, y: 80 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        <div className="text-color1 border-1 border-b-0 rounded-tr-xl rounded-tl-xl border-[#FF6B6B] flex flex-col gap-3 p-4 sm:p-8 pb-4 pt-4">
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
            className="flex flex-col gap-3 border-2 rounded-lg p-3"
          >
            <h3 className="font-bold">User Profile</h3>
            <div className="flex gap-3 items-center">
              <HugeiconsIcon
                icon={UserIcon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
              <div>{user.name}</div>
            </div>
            <div className="flex gap-3 items-center">
              <HugeiconsIcon
                icon={Mail01Icon}
                size={24}
                color="currentColor"
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
            className="flex flex-col gap-3 border-2 rounded-lg p-3"
          >
            <h3 className="font-bold">User Activity</h3>
            <h3 className="">Last Login</h3>
            <div className="flex gap-3 items-center">
              <HugeiconsIcon
                icon={Time02Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
              {formatDate(user.lastLogin)}
            </div>
            <h3 className="">Joined</h3>
            <div className="flex gap-3 items-center">
              <HugeiconsIcon
                icon={Calendar01Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric", 
                month: "long", 
                day: "numeric"
              })}
            </div>
          </m.div>

          <m.button
            onClick={handleLogout}
            className="bg-[#FF6B6B] text-[#fff] font-bold rounded-lg p-4 cursor-pointer shadow-lg focus:outline-none focus:ring-[#ff5e5e] focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fff] transition-duration-200 hover:bg-[#ff5e5e] text-center"
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
                color="currentColor"
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

// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   Loading02Icon,
//   LockPasswordIcon,
//   Mail01Icon,
//   UserIcon,
// } from '@hugeicons/core-free-icons';
// import { HugeiconsIcon } from '@hugeicons/react';

// import Input from '../components/Input';
// import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
// import { useAuthStore } from '../store/authStore';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const { signup, error, isLoading, isAuthenticated } = useAuthStore()

//   const navigate = useNavigate()

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await signup(email, password, email);
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   useEffect(() => {
//     if(isAuthenticated) {
//       navigate("/verify-email")
//     }
//   }, [isAuthenticated, navigate])

//   return (
//     <>
//       <motion.div
//         className=" h-auto w-full sm:max-w-md z-10 rounded-xl bg-[#fff] backdrop-blur-xl backdrop-filter shadow-xl bg-opacity-100 overflow-hidden"
//         initial={{ opacity: 0, y: 80 }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           duration: 1,
//         }}
//       >
//         <form
//           onSubmit={handleSignup}
//           className="text-color1 border-1 border-b-0 rounded-tr-xl rounded-tl-xl border-[#FF6B6B] flex flex-col gap-3 p-4 sm:p-8 pb-4 pt-4"
//         >
//           <div className="text-center text-xl font-bold text-color1">
//             Auth App Signup Form
//           </div>

//           <Input
//             label="UserName"
//             icon={UserIcon}
//             type="text"
//             placeholder="Full name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <Input
//             label="Email"
//             icon={Mail01Icon}
//             type="text"
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Input
//             label="Password"
//             icon={LockPasswordIcon}
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && <p className='text-sm text-red-800 font-bold'>{error}</p>}

//           {password.length ? (
//             <PasswordStrengthIndicator password={password} />
//           ) : (
//             ''
//           )}

//           <motion.button
//             type="submit"
//             className="bg-[#FF6B6B] text-[#fff] font-bold rounded-lg p-4 cursor-pointer shadow-lg focus:outline-none focus:ring-[#ff5e5e] focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fff] transition-duration-200 hover:bg-[#ff5e5e]"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             disabled={isLoading}
//           >
//                         {isLoading ? (
//               <HugeiconsIcon
//                 icon={Loading02Icon}
//                 size={24}
//                 color="currentColor"
//                 strokeWidth={1.5}
//                 className="animate-spin mx-auto"
//               />
//             ) : (
//               'Signup'
//             )}
//           </motion.button>
//         </form>
//         <div className="flex flex-row gap-3 items-center justify-center bg-gray-900 rounded-br-xl rounded-bl-xl py-8 text-gray-300">
//           <p>Already have an account?</p>
//           <Link to={'/login'} className="text-color1 hover:underline">
//             Log in
//           </Link>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default Signup;
