import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import ViewAllJobs from '../components/ViewAllJobs';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const MainLayout = ({token,setToken}) => {
  return (
    <div>

        <Navbar  token={token} setToken={setToken}/>
        <Outlet />
        <ToastContainer />
      
       
    </div>
  )
}

export default MainLayout
