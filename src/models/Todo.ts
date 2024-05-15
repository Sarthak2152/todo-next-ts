import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const TodoModel =
  (mongoose.models.Todo as mongoose.Model<ITodo>) ||
  mongoose.model<ITodo>("Todo", TodoSchema);

export default TodoModel;
