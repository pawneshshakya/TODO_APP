const UserManager = require("../managers/todo.manager");
const saveTask = async (req, res) => {
  try {
    const task = await UserManager.saveTask(req.body, req.user);
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error: error });
  }
};
const allTask = async (req, res) => {
  try {
    const userData = await UserManager.allTask(req.user);
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error: error });
  }
};

const getTask = async (req, res) => {
  try {
    const userData = await UserManager.getTask(req.params.id);
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error: error });
  }
};
const completeTask = async (req, res) => {
  try {
    const userData = await UserManager.completeTask(req.params.id);
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error: error });
  }
};
const deleteTask = async (req, res) => {
  try {
    const userData = await UserManager.deleteTask(req.params.id);
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error: error });
  }
};

const markInComplete = async (req, res) => {
  try {
    const userData = await UserManager.markInComplete(req.params);
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error: error });
  }
};
const markInProgress = async (req, res) => {
  try {
    const userData = await UserManager.markInProgress(req.params);
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error: error });
  }
};

module.exports = {
  saveTask,
  getTask,
  allTask,
  completeTask,
  deleteTask,
  markInComplete,
  markInProgress,
};
