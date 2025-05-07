import db from "../config/db.js";

export const getAllTasks = (callback) => {
  db.query("SELECT * FROM tasks", callback);
};

export const createTask = (task, callback) => {
  db.query("INSERT INTO tasks (title) VALUES (?)", [task.title], callback);
};

export const updateTask = (id, task, callback) => {
  db.query("UPDATE tasks SET title = ? WHERE id = ?", [task.title, id], callback);
};

export const deleteTask = (id, callback) => {
  db.query("DELETE FROM tasks WHERE id = ?", [id], callback);
};
