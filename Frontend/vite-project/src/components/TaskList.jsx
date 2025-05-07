import React, { useState } from "react";

const TaskList = ({ tasks, refresh }) => {
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });
    refresh();
  };

  const handleUpdate = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    setEditId(null);
    refresh();
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {editId === task.id ? (
            <>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button onClick={() => handleUpdate(task.id)}>Save</button>
            </>
          ) : (
            <>
              {task.title}
              <button onClick={() => { setEditId(task.id); setNewTitle(task.title); }}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
