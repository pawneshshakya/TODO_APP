const mongoose = require("mongoose");

const connectDb = () => {
  try {
    const conn = mongoose.connect(
      "mongodb+srv://pawneshkumar162:root@cluster0.nqgi1sz.mongodb.net/todoapp?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Connection Successfull: ${JSON.stringify(conn)}`);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDb;
