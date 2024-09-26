// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const location = useLocation();  // Get the current path

  const handleLogout = () => {
    logout(); // Calling logout from the AuthContext
  };

  return ( // bg-blue-600
    <nav className="sticky top-0 bg-black z-50 p-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Link to Home Page */}
          <Link to="/">
            <img src="../public/home.png" alt="logo" className="w-8 h-8" />
          </Link>
          {/* Link to Home Page through App Name */}
          <Link to="/" className="text-white text-2xl font-bold">
            Diabetes App
          </Link>
        </div>
        <div className="left-options flex space-x-4">
          <Link
            to="/model1"
            className={`${
              location.pathname === '/model1' ? 'bg-blue-500 underline' : 'bg-blue-600'
            } text-white text-lg hover:bg-blue-400 px-3 py-1 rounded-lg transition duration-300`}
          >
            Diabetes Risk Assessment
          </Link>
          <Link
            to="/model2"
            className={`${
              location.pathname === '/model2' ? 'bg-blue-500 underline' : 'bg-blue-600'
            } text-white text-lg hover:bg-blue-400 px-3 py-1 rounded-lg transition duration-300`}
          >
            Diabetes Predictor
          </Link>
          <Link
            to="/blogs"
            className={`${
              location.pathname === '/blogs' ? 'bg-blue-500 underline' : 'bg-blue-600'
            } text-white text-lg hover:bg-blue-400 px-3 py-1 rounded-lg transition duration-300`}
          >
            Blogs
          </Link>
          <Link
            to="/exercise"
            className={`${
              location.pathname === '/exercise' ? 'bg-blue-500 underline' : 'bg-blue-600'
            } text-white text-lg hover:bg-blue-400 px-3 py-1 rounded-lg transition duration-300`}
          >
            Exercise
          </Link>
          <Link
            to="/calculator"
            className={`${
              location.pathname === '/calculator' ? 'bg-blue-500 underline' : 'bg-blue-600'
            } text-white text-lg hover:bg-blue-400 px-3 py-1 rounded-lg transition duration-300`}
          >
            Calculator
          </Link>
        </div>

        <div className="right-options flex space-x-1">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-white text-lg bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg transition duration-300">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white text-lg bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-white text-lg bg-blue-600 hover:bg-yellow-600 px-3 py-1 rounded-lg transition duration-300">
                Signup
              </Link>
              <Link to="/login" className="text-white text-lg bg-blue-600 hover:bg-purple-600 px-3 py-1 rounded-lg transition duration-300">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;






// // src/components/Navbar.jsx
// import React, { useState, useContext  } from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css'; // Create this file for styling
// import { AuthContext } from '../context/AuthContext';

// const Navbar = () => {
//   const { isAuthenticated, logout } = useContext(AuthContext);
//   // const [isAuthenticated, setIsAuthenticated] = useState(true);

//   const handleLogout = () => {
//     // localStorage.removeItem('token');
//     // setIsAuthenticated(false);
//   };

//   return (
//     <nav className="navbar">
//       <div className="left-options">
//         <Link to="/model1" className="option">Model 1</Link>
//         <Link to="/model2" className="option">Model 2</Link>
//         <Link to="/blogs" className="option">Blogs</Link>
//         <Link to="/exercise" className="option">Exercise</Link>
//       </div>
//       <div className="right-options">
//         {isAuthenticated ? (
//           <>
//             <Link to="/profile" className="option">Profile</Link>
//             {/* <button onClick={handleLogout} className="option">Logout</button> */}
//           </>
//         ) : (
//           <>
//             <Link to="/signup" className="option">Signup</Link>
//             <Link to="/login" className="option">Login</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
