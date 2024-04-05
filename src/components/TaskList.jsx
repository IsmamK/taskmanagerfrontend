import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = ({ tasks }) => {
    console.log(tasks)
    const navigate = useNavigate()
    const handleMarkCompleted = async (taskId) => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`/api/tasks/${taskId}/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify({ status: 'completed' }),
          });
          if (response.ok) {
            toast.success('Task marked as completed!',{
                autoClose: 500,
                onClose: ()=>{
                    window.location.reload()
                }
            });
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
            const response = await fetch(`/api/tasks/${taskId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
            });
            if (response.ok) {
                // Remove the deleted task from the task list in the UI
      
                // Show a success toast
                toast.error('Task Deleted',{
                    autoClose: 500,
                    onClose: ()=>{
                        window.location.reload()
                    }
                })
            } else {
                console.error('Failed to delete task:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    
  return (
    <>
    <ToastContainer />
    <ul className="divide-y divide-gray-200">
      {tasks.map(task => (
        <li key={task.id} className="py-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            {task.status === 'pending' && (
              <>
                {/* Mark Completed button */}
                <button
                  className="text-sm text-green-500 hover:bg-green-100 hover:text-green-700 px-2 py-1 rounded focus:outline-none"
                  onClick={() => handleMarkCompleted(task.id)}
                >
                  ✓ Mark Completed
                </button>
                {/* Delete button */}
                <button
                  className="text-sm text-red-500 hover:bg-red-100 hover:text-red-700 px-2 py-1 rounded focus:outline-none"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  ✕ Delete
                </button>
              </>
            )}
            {task.status === 'completed' && (
              <div className="text-sm text-blue-500 px-2 py-1 rounded bg-blue-100">
                Completed
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
    </>
  );
};

export default TaskList;
