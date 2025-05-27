import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '@/routes/home';
import Capacity from "@/routes/capacity";
import LinkBudget from "@/routes/link-budget";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/capacity" element={<Capacity />} />
          <Route path="/link-budget" element={<LinkBudget />} />
        </Routes>
      </Router>
    </>
  )
}