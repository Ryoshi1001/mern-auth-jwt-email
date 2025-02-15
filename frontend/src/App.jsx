import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import BackgroundCircles1 from './components/BackgroundCircles1';
import BackgroundCircles2 from './components/BackgroundCircles2';
import { Toaster } from 'react-hot-toast';
import Logout from './pages/Logout';
import { Loading02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useAuthStore } from './store/authStore';

const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Homepage = lazy(() => import('./pages/Homepage'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));

//protected routes that need authentication

const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore()

  if(!isAuthenticated) {
    return <Navigate to="/login" replace/>
  }

  if(!user.isVerified) {
    return <Navigate to="/verify-email" replace/>
  }

  return children; 
}

//redirect authenticated user to homepage.
const AuthenticatedUserRedirect = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log('isAuthenticated:', isAuthenticated);
  console.log('user', user);
  return (
    <LazyMotion features={domAnimation}>
      <div className="primary-bg min-h-screen flex items-center justify-center relative overflow-hidden p-[1rem]">
        <BackgroundCircles1
          color="accent-color2"
          size="w-64 h-64"
          top="-8%"
          left="4%"
          delay={0}
        />
        <BackgroundCircles2
          color="accent-color1"
          size="w-44 h-44"
          top="10%"
          right="34%"
          delay={4}
        />
        <BackgroundCircles1
          color="accent-color1"
          size="w-34 h-34"
          bottom="30%"
          right="30%"
          delay={0}
        />

        <Suspense
          fallback={
            <HugeiconsIcon
              icon={Loading02Icon}
              size={24}
              color="#fff"
              strokeWidth={1.5}
              className="animate-spin mx-auto"
            />
          }
        >
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
              } />
            <Route
              path="/signup"
              element={
                <AuthenticatedUserRedirect>
                  <Signup />
                </AuthenticatedUserRedirect>
              }
            />
            <Route
              path="/login"
              element={
                <AuthenticatedUserRedirect>
                  <Login />
                </AuthenticatedUserRedirect>
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Toaster />
        </Suspense>
      </div>
    </LazyMotion>
  );
}

export default App;

// import { Route, Routes } from 'react-router-dom';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Homepage from './pages/Homepage';
// import BackgroundCircles1 from './components/BackgroundCircles1';
// import BackgroundCircles2 from './components/BackgroundCircles2';
// import ForgotPassword from './pages/ForgotPassword';
// import VerifyEmail from './pages/VerifyEmail';

// function App() {
//   return (
//     <>
//       <div className='primary-bg min-h-screen flex items-center justify-center relative overflow-hidden p-[1rem]'>
//         <BackgroundCircles1 color="accent-color2" size='w-64 h-64' top='-8%' left='4%' delay={0}/>
//         <BackgroundCircles2 color="accent-color1" size='w-44 h-44' top='10%' right='34%' delay={4}/>
//         <BackgroundCircles1 color="accent-color1" size='w-34 h-34' bottom='30%' right='30%' delay={0}/>

//         <Routes>
//           <Route path="/" element={<Homepage />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/verify-email" element={<VerifyEmail />} />
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;
