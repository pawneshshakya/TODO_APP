const express = require("express");
const TodoRouter = require("./routes/todo");
const AuthRouter = require("./routes/authentication");
const connectDb = require("./config/db.connect");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = 8000;

connectDb();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use("/", AuthRouter);
app.use("/todo", TodoRouter);

app.listen(PORT, () => {
  console.log(`server is satrted at port ${PORT}`);
});
