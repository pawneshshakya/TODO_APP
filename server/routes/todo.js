const express = require("express");
const { authenticateJWT } = require("../utils");
const {
  saveTask,
  allTask,
  getTask,
  completeTask,
  deleteTask,
  markInComplete,
  markInProgress,
} = require("../controllers/todo.controller");
const UserRouter = express.Router();

UserRouter.post("/saveTask", authenticateJWT, saveTask);
UserRouter.get("/allTask", authenticateJWT, allTask);
UserRouter.get("/getTask/:id", authenticateJWT, getTask);
UserRouter.get("/completeTask/:id", authenticateJWT, completeTask);
UserRouter.delete("/deleteTask/:id", authenticateJWT, deleteTask);
UserRouter.get("/markInComplete/:id", authenticateJWT, markInComplete);
UserRouter.get("/markInProgress/:id", authenticateJWT, markInProgress);

module.exports = UserRouter;
