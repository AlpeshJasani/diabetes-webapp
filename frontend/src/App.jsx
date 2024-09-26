// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Import the Home component
import Model1 from './pages/Model1'; // Example pages
import Model2 from './pages/Model2';
import Blogs from './pages/Blogs';
import Exercise from './pages/Exercise';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Navbar from './components/Navbar'; // Import the Navbar component
import Suggestions2 from './pages/Suggestions2';
import Suggestions1 from './pages/Suggestions1';
import Calculator from './pages/Calculator';
import { FaCalculator } from 'react-icons/fa';

const App = () => {
  return (
      <div>
        <Navbar />  {/* Navbar will stay on top */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model1" element={<Model1 />} />
          <Route path="/suggestions1" element={<Suggestions1 />} />
          <Route path="/model2" element={<Model2 />} />
          <Route path="/suggestions2" element={<Suggestions2 />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </div>
  );
};

export default App;
