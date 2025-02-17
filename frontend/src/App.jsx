import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import BackgroundCircles1 from './components/BackgroundCircles1';
import BackgroundCircles2 from './components/BackgroundCircles2';
import { Toaster } from 'react-hot-toast';
import { Loading02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useAuthStore } from './store/authStore';
import ResetPassword from './pages/ResetPassword';

const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Homepage = lazy(() => import('./pages/Homepage'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));

//protected routes that need authentication

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

//redirect authenticated user to homepage.
const AuthenticatedUserRedirect = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="primary-bg min-h-screen flex items-center justify-center relative overflow-hidden p-[1rem]">
        <BackgroundCircles1
          color="accent-color1"
          size="w-64 h-64"
          top="-8%"
          left="4%"
          delay={3}
        />
        <BackgroundCircles2
          color="accent-color2"
          size="w-44 h-44"
          top="10%"
          right="34%"
        
        />
        <BackgroundCircles1
          color="accent-color2"
          size="w-34 h-34"
          bottom="30%"
          right="30%"
          
        />

        <Suspense
          fallback={
            <HugeiconsIcon
              icon={Loading02Icon}
              color="#FFE8FF"
              strokeWidth={1.5}
              className="animate-spin mx-auto h-24 w-24"
            />
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
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
            <Route
              path="/forgot-password"
              element={
                <AuthenticatedUserRedirect>
                  <ForgotPassword />
                </AuthenticatedUserRedirect>
              }
            />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route
              path="/reset-password/:token"
              element={
                <AuthenticatedUserRedirect>
                  <ResetPassword />
                </AuthenticatedUserRedirect>
              }
            />
            {/* catch all routes could also be 404 page */}
            <Route path="*" element={<Homepage />} />
          </Routes>
          <Toaster />
        </Suspense>
      </div>
    </LazyMotion>
  );
}

export default App;
