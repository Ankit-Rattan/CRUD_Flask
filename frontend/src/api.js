export const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/api/tasks');
    return response.json();
  };
  
  export const updateTask = async (id, completed) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
    return response.json();
  };
  
  export const deleteTask = async (id) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  };
  