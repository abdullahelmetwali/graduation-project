import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';

import Navbar from '@/components/app/navbar';

import Home from "@/routes/home";
import Capacity from "@/routes/app/capacity";
import Coverage from "@/routes/app/coverage";

import Login from '@/routes/auth/login';
import SignUp from '@/routes/auth/sign-up';
import Profile from '@/routes/auth/profile';
import ForgetPassword from '@/routes/auth/forget-password';
import Footer from '@/components/app/footer';

export default function App() {
  return (
    <>
      <Router>
        <TooltipProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/capacity" element={<Capacity />} />
            <Route path="/coverage" element={<Coverage />} />
          </Routes>
          <Footer />
        </TooltipProvider>
      </Router>
    </>
  );
};