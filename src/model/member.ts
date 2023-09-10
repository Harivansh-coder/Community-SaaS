// member model implementation

import mongoose, { model, Schema } from "mongoose";

// member Interface
export interface IMember {
  community: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  role: mongoose.Types.ObjectId;
}

// mongoose member schema
const memberSchema = new Schema<IMember>(
  {
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose member model
const Member =
  (mongoose.models.Member as mongoose.Model<IMember>) ||
  model("Member", memberSchema);

export default Member;
