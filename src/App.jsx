// src/App.jsx
import React,{useState,useEffect} from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import Register from './pages/Register';
import MainLayout from './layout/MainLayout';
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import NotFoundPage from './pages/NotFoundPage';
import AllTasks from './pages/AllTasks';
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isAuthenticated = localStorage.getItem('token') !== null;

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        if (token) {
          const response = await fetch("/api/users/me", {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            localStorage.setItem("username",userData.username);
            localStorage.setItem("email",userData.email);
          } else {
            // Handle error response
            console.error('Failed to fetch user data:', response.statusText);
          }
        }else{
          localStorage.removeItem("username");
          localStorage.removeItem("email");

        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [token]);

  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout  token={token} setToken={setToken}/>}>
        <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />} />
        <Route path='/tasks' element={<AllTasks/>} />
        <Route path='/login' element={<Login token={token} setToken={setToken}/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
    )
  
    return <RouterProvider router={router} />;


    
};

export default App;
