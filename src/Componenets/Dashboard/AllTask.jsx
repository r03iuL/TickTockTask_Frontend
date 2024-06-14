import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data); // Assuming data is an array of tasks fetched from the backend
      } else {
        console.error('Failed to fetch tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const organizeTasksByStatus = () => {
    const organizedTasks = {
      todo: [],
      ongoing: [],
      completed: [],
    };

    tasks.forEach(task => {
      if (task.status === 'todo') {
        organizedTasks.todo.push(task);
      } else if (task.status === 'ongoing') {
        organizedTasks.ongoing.push(task);
      } else if (task.status === 'completed') {
        organizedTasks.completed.push(task);
      }
    });

    return organizedTasks;
  };

  const sortedTasks = organizeTasksByStatus();

  const  handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted task from the state
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
        console.log('Task deleted successfully!');
      } else {
        console.error('Failed to delete task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = (taskId) => {
    navigate(`/dashboard/editTask/${taskId}`);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedTasks = [...tasks];
    const movedTask = updatedTasks[source.index];

    // Move task to new position
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    // Update status based on destination droppableId
    const newStatus = destination.droppableId;
    movedTask.status = newStatus;

    setTasks(updatedTasks);

    // Save updated task status to backend
    try {
      const response = await fetch(`http://localhost:3000/tasks/${movedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        console.error('Failed to update task status:', response.statusText);
        fetchTasks(); // Refresh tasks on failure
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      fetchTasks(); // Refresh tasks on error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl px-8 py-6 bg-white rounded-lg">
        {/* <h2 className="text-3xl font-bold mb-4 text-center mb-4" >All Tasks</h2> */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(sortedTasks).map(status => (
              <div key={status}>
                <h3 className="text-lg text-center font-semibold mx-10 px-10 py-3 border-b-4 rounded-md border-orange-400 bg-orange-200">{status.toUpperCase()}</h3>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <ul className="mt-2" ref={provided.innerRef} {...provided.droppableProps}>
                      {sortedTasks[status].map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-4 m-4 border-4 rounded-md border-orange-400 bg-orange-200"
                            >
                              <div className="flex flex-col items-center justify-between ">
                                <div>
                                  <div className="mr-2 font-bold">{task.title}</div>
                                  <p className="text-sm mt-1">{task.description}</p>
                                  <div className="my-2 font-semibold text-gray-500">Deadline: {task.deadline}</div>
                                </div>
                                <div>
                                  <button
                                    className="mr-2 btn btn-sm btn-outline"
                                    onClick={() => handleUpdateTask(task._id)}
                                  >
                                    Update
                                  </button>
                                  <button
                                    className="mr-2 btn btn-sm btn-outline"
                                    onClick={() => handleDeleteTask(task._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                              
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
        <button
          className="mt-4 btn btn-primary"
          onClick={() => navigate('/dashboard/newTask')}
        >
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default AllTasks;
