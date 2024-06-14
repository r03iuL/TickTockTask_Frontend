import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('low');
  const [status, setStatus] = useState('todo');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = { title, description, deadline, priority, status };
    
    try {
        const response = await fetch('https://ticktocktask-backend.onrender.com/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });
    
        if (response.ok) {
          setTitle('');
          setDescription('');
          setDeadline('');
          setPriority('low');
          setStatus('todo');
          console.error('Inserted successfully!');
          alert("Inserted!");
          navigate('/dashboard/AllTask');
        } else {
          const errorMessage = await response.text(); 
          console.error('Failed to create task:', errorMessage);
        }
      } catch (error) {
        console.error('Error creating task:', error); 
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="card w-[100vh] max-w-md  bg-white">
        <div className="card-body">
          <h2 className="card-title text-center ">Create New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label ">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-[200px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                className="select select-bordered"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="todo">To Do</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
