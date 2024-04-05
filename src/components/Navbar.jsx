import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Navbar = ({token,setToken}) => {
  
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem("token");
  const handleLogout = async () => {
    // Clear the token from localStorage or perform any other necessary logout actions
    try{
      const response = await fetch("api/token/logout",{
        method:"POST",
        headers:{
          Authorization:  `Token ${localStorage.getItem("token")}`,
        }

      });

      if (response.ok){
        setToken(null)
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        console.log(localStorage.getItem("Successfully logged out"))
        
      }else {
        // Handle error response
        console.error("Failed to logout:", response.statusText);
      }
    }catch (error) {
      console.error("Error logging out:", error);
    }
    
    // Perform any additional logout logic, such as redirecting to the login page
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">Task Manager</Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {isLoggedIn ? (
                  <div className="text-white flex items-center space-x-2">
                    <div>{localStorage.getItem("username")}</div>
                    <button onClick={handleLogout} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                  </div>
                ) : (
                  <div className="flex space-x-4"> {/* Adjusted */}
                  <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  <Link to="/register" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                </div>
                )}
                <Link to="/tasks" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">All Tasks</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
