const AuthManager = require("../managers/auth.manager");

const register = async (req, res) => {
  try {
    const registerData = await AuthManager.register(req.body);
    res.status(200).send(registerData);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something Went Wrong", errorMessage: err.message });
  }
};
const login = async (req, res) => {
  try {
    const loginData = await AuthManager.login(req.query);
    res.status(200).send(loginData);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something Went Wrong", errorMessage: err.message });
  }
};

module.exports = { register, login };
