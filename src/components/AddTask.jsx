import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://ismamk.pythonanywhere.com/api/tasks/?page=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        toast.error('Error adding task')
        console.error('Failed to add task');
       

      }

      toast.success('Task added',{
        autoClose: 500,
        onClose: ()=>{
            window.location.reload()
        }
    })

      // Parse the response body as JSON
      const data = await response.json();

      // Add the new task to the tasks array


      // Reset form fields
      setTitle('');
      setDescription('');

    } catch (error) {
      console.error('Error adding task:', error);
      // Handle error here, such as displaying an error message to the user
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Add Task</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter task description"
          ></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
