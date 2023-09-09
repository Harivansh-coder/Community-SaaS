// user model for mongodb database
import mongoose, { Schema, model, Document } from "mongoose";

// user interface for typescript
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// user schema for mongodb
const userSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

// user model for mongodb
const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  model<IUser>("User", userSchema);

export default User;
