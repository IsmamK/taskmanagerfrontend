// src/pages/Login.js
import React, { useState,useEffect,useContext } from 'react';
import { useNavigate } from "react-router-dom";
const Login = ({token,setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [token, setToken] = useState(null); // State to store the token
  const [error, setError] = useState(null);
  const navigate = useNavigate();

const handleLogin = async (e) => {

  e.preventDefault();
  
  if (!email || !password) {
    setError('Email and password are required');
    return;
  }

  try {
    const response = await fetch('https://ismamk.pythonanywhere.com/api/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      
    });
   
   
    if (response.ok){
      const data = await response.json();
      setToken(data.auth_token);
      localStorage.setItem("token", data.auth_token); // Update token in localStorage
      console.log(data.auth_token)
      navigate("/")
      

    } else {
      const errorData = await response.json();
      setError(errorData.detail);
    }
  } catch(error) { // Catch the error here
    console.error('Error logging in:', error);
    setError('An unexpected error occurred.'); // Update the error state with a generic error message
  }
  
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full md:max-w-xl space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your email"  
            value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input id="password" name="password" type="password" autoComplete="current-password" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password"
            value={password} // Bind the value to the password state
            onChange={(e) => setPassword(e.target.value)}
             />
          </div>

          {error && <p className="text-red-500">{error}</p>} {/* Display error message if present */}
          <div className="flex items-center justify-between">
      

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
