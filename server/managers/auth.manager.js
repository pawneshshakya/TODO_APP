const userModel = require("../models/user.model");
const { encryptPass, compare, jwtEncode } = require("../utils");

const register = async (body) => {
  try {
    body.password = await encryptPass(body.password);
    const user = await userModel(body).save();
    return user;
  } catch (error) {
    console.log(error);
  }
};
const login = async ({ email, password }) => {
  try {
    const user = await userModel.findOne({ email }).lean();
    const match = await compare(password, user.password);
    if (match) {
      const token = await jwtEncode({
        id: user._id.toHexString(),
        email: user.email,
      });
      return { message: "Login Successfull", token };
    } else {
      return { message: "Username or Password is incorrect" };
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register, login };
