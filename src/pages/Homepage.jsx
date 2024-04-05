import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';
import AddTaskForm from '../components/AddTask';

const Homepage = () => {
  
  

  const [pendingTasks, setPendingTasks] = useState([]);
  const isAuthenticated = localStorage.getItem('token') !== null;
  const navigate = useNavigate()
  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/tasks?search=pending', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPendingTasks(data);
        } else {
          console.error('Failed to fetch pending tasks:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching pending tasks:', error);
      }
    };

    fetchPendingTasks();
  }, []);

 

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Pending Tasks</h2>
          <TaskList tasks={pendingTasks} />
        </div>
      </div>

      <div>
          <AddTaskForm />
        </div>
    </div>
  );
};

export default Homepage;
