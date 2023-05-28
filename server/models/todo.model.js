const { Schema, default: mongoose } = require("mongoose");

const TodoModel = new Schema({
  task: { type: String, require: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["IN_PROGRESS", "COMPLETED", "INCOMPLETED"],
    default: "IN_PROGRESS",
  },
  addedOn: { type: Date, require: true, default: new Date() },
  completedOn: { type: Date },
  dueDate: { type: Date },
  updatedOn: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("Todo", TodoModel);
