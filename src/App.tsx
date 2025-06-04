import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';

import Home from "@/routes/home";
import Capacity from "@/routes/capacity";
import Coverage from "@/routes/coverage";
import Login from '@/routes/login';
import SignUp from '@/routes/sign-up';
import Profile from '@/routes/profile';
import Navbar from './components/app/navbar';

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/capacity" element={<Capacity />} />
            <Route path="/coverage" element={<Coverage />} />
          </Routes>
        </TooltipProvider>
      </Router>
    </>
  );
};