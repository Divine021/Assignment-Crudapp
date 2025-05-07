import React, { useState } from "react";
import TaskForm from './TaskForm.jsx';
import TaskList from './TaskList.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data);
      setShowTasks(true);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Hide tasks
  const hideTasks = () => {
    setTasks([]);
    setShowTasks(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Task Manager</h2>

      <TaskForm refresh={fetchTasks} />

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={fetchTasks}
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginRight: "10px",
            cursor: "pointer"
          }}
        >
          Show All Tasks
        </button>

        <button
          onClick={hideTasks}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Hide Tasks
        </button>
      </div>

      {showTasks && <TaskList tasks={tasks} refresh={fetchTasks} />}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
