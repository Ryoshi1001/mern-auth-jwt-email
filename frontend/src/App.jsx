import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import BackgroundCircles1 from './components/BackgroundCircles1';
import BackgroundCircles2 from './components/BackgroundCircles2';
import ForgotPassword from './pages/ForgotPassword';


function App() {
  return (
    <>
      <div className='primary-bg min-h-screen flex items-center justify-center relative overflow-hidden p-[1rem]'>
        <BackgroundCircles1 color="accent-color2" size='w-64 h-64' top='-8%' left='4%' delay={0}/>
        <BackgroundCircles2 color="accent-color1" size='w-44 h-44' top='10%' right='34%' delay={4}/>
        <BackgroundCircles1 color="accent-color1" size='w-34 h-34' bottom='30%' right='30%' delay={0}/>





        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
