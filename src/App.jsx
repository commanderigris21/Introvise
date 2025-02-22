// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Resume from './Components/Resume/Resume';
import Facecam from './Components/Facecam/Facecam';

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/facecam" element={<Facecam />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;