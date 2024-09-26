import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaChartBar, FaHistory } from 'react-icons/fa';

const Profile = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Get email from localStorage
  const email = localStorage.getItem('authEmail') || 'user@example.com'; // Default email if not found


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-8">
        <div className="flex items-center space-x-4">
          <FaUser className="text-blue-600 w-12 h-12" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
            <p className="text-gray-600"><b>Email:</b> {email}</p>
          </div>
        </div>
      </div>

      {/* Data Visualization Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-8">
        <div className="flex items-center space-x-4">
          <FaChartBar className="text-green-600 w-12 h-12" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Data Visualization</h2>
            <p className="text-gray-600">This section is under construction.</p>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-8">
        <div className="flex items-center space-x-4">
          <FaHistory className="text-yellow-600 w-12 h-12" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">History</h2>
            <p className="text-gray-600">This section is under construction.</p>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <h1>Profile Page</h1>
    //   {isAuthenticated && (
    //     <>
    //       <p>Welcome, {localStorage.getItem('authEmail')}</p>
    //       <button onClick={logout}>Logout</button>
    //     </>
    //   )}
    // </div>
  );
};

export default Profile;


// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user's email is stored in localStorage
//     const authEmail = localStorage.getItem('authEmail');
    
//     if (!authEmail) {
//       // If no email is found, redirect to login page
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     // Remove the email from localStorage when logging out
//     localStorage.removeItem('authEmail');
//     navigate('/login');
//   };

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <p>Welcome, {localStorage.getItem('authEmail')}</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Profile;
