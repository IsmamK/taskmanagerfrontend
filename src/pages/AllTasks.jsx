import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://ismamk.pythonanywhere.com/api/tasks', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
          const pending = data.filter(task => task.status === 'pending');
          const completed = data.filter(task => task.status === 'completed');
          setPendingTasks(pending);
          setCompletedTasks(completed);
        } else {
          console.error('Failed to fetch tasks:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleMarkCompleted = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://ismamk.pythonanywhere.com/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({ status: 'completed' })
      });
      if (response.ok) {
        // Update local state
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: 'completed' };
          }
          return task;
        });
        setTasks(updatedTasks);
        setPendingTasks(updatedTasks.filter(task => task.status === 'pending'));
        setCompletedTasks(updatedTasks.filter(task => task.status === 'completed'));
      } else {
        console.error('Failed to mark task as completed:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://ismamk.pythonanywhere.com/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`
        }
      });
      if (response.ok) {
        // Update local state
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        setPendingTasks(updatedTasks.filter(task => task.status === 'pending'));
        setCompletedTasks(updatedTasks.filter(task => task.status === 'completed'));
      } else {
        console.error('Failed to delete task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Pending Tasks</h2>
          <TaskList tasks={pendingTasks} onMarkCompleted={handleMarkCompleted} onDeleteTask={handleDeleteTask} />
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Completed Tasks</h2>
          <TaskList tasks={completedTasks} />
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
