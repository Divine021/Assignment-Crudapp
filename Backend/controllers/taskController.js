import * as Task from "../models/taskModel.js";

export const getTasks = (req, res, next) => {
  Task.getAllTasks((err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

export const addTask = (req, res, next) => {
  Task.createTask(req.body, (err, result) => {
    if (err) return next(err);
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

export const updateTask = (req, res, next) => {
  Task.updateTask(req.params.id, req.body, (err) => {
    if (err) return next(err);
    res.json({ message: "Task updated" });
  });
};

export const deleteTask = (req, res, next) => {
  Task.deleteTask(req.params.id, (err) => {
    if (err) return next(err);
    res.json({ message: "Task deleted" });
  });
};
