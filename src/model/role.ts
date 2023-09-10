// role model implementation

import mongoose, { model, Schema } from "mongoose";

// role Interface
export interface IRole {
  name: string;
  createdAt?: Date;
}

// mongoose role schema
const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose role model
const Role =
  (mongoose.models.Role as mongoose.Model<IRole>) || model("Role", roleSchema);

export default Role;
