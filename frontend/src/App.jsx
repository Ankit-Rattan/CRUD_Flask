import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchTasks, updateTask, deleteTask } from './api';
import AddTaskForm from './components/AddTaskForm';


function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks()
      .then(data => setTasks(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleCheckboxChange = (id, completed) => {
    updateTask(id, completed)
      .then(updatedTask => {
        const updatedTasks = tasks.map(task => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDelete = (id) => {
    deleteTask(id)
      .then(deletedTask => {
        const updatedTasks = tasks.filter(task => task.id !== deletedTask.id);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleAddTask = (title) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <AddTaskForm onAddTask={handleAddTask} />
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id, !task.completed)}
              />
              <span className={task.completed ? 'completed' : ''}>{task.title}</span>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
