const todoModel = require("../models/todo.model");

const saveTask = async (data, user) => {
  try {
    let task;
    let message;
    if (data._id) {
      task = await todoModel
        .findOneAndUpdate(
          { _id: data._id },
          { ...data, updatedOn: new Date() },
          { new: true }
        )
        .lean();
      message = "Task updated Successfully";
    } else {
      task = await todoModel({
        ...data,
        user: user.id,
      }).save();
      message = "Task created Successfully";
    }
    return { task, message };
  } catch (error) {
    console.log(error);
  }
};
const allTask = async (user) => {
  try {
    const tasks = await todoModel.find({ user: user.id }).lean();
    return tasks;
  } catch (error) {
    console.log(error);
  }
};
const getTask = async (taskId) => {
  try {
    const task = await todoModel.findOne({ _id: taskId }).lean();
    return task;
  } catch (error) {
    console.log(error);
  }
};
const completeTask = async (taskId) => {
  try {
    const task = await todoModel
      .findOneAndUpdate(
        { _id: taskId },
        { status: "COMPLETED", completedOn: new Date(), updatedOn: new Date() },
        { new: true }
      )
      .lean();
    return { task, message: "Task Completed" };
  } catch (error) {
    console.log(error);
  }
};
const deleteTask = async (taskId) => {
  try {
    await todoModel.deleteOne({ _id: taskId });
    return { message: "Task Deleted." };
  } catch (error) {
    console.log(error);
  }
};
const markInComplete = async ({ id }) => {
  try {
    const task = await todoModel
      .findOneAndUpdate(
        { _id: id },
        { status: "INCOMPLETED", updatedOn: new Date() },
        { new: true }
      )
      .lean();
    return { message: "Task Marked as Incomplete.", task };
  } catch (error) {
    console.log(error);
  }
};
const markInProgress = async ({ id }) => {
  try {
    const task = await todoModel
      .findOneAndUpdate(
        { _id: id },
        { status: "IN_PROGRESS", updatedOn: new Date() },
        { new: true }
      )
      .lean();
    return { message: "Task Marked as In Progress.", task };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveTask,
  allTask,
  getTask,
  completeTask,
  deleteTask,
  markInComplete,
  markInProgress,
};
