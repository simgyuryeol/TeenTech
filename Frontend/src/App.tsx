import React from 'react';
import './App.css';
import Home from './pages/home';
import Test from './pages/test';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
      <div className="text-3xl font-bold underline">hello, world!</div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
