import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';

import Home from "@/routes/home";
import Capacity from "@/routes/capacity";
import Coverage from "@/routes/coverage";

export default function App() {
  return (
    <>
      <Router>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/capacity" element={<Capacity />} />
            <Route path="/coverage" element={<Coverage />} />
          </Routes>
        </TooltipProvider>
      </Router>
    </>
  );
};