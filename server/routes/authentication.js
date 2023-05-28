const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.get("/login", login);

module.exports = AuthRouter;
