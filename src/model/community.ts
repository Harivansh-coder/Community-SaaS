// community model definition and schema

import mongoose, { Schema, model, Document } from "mongoose";

// community entity interface
export interface ICommunity extends Document {
  name: string;
  slug: string;
  owner: mongoose.Types.ObjectId;
}

// community entity schema
const communitySchema = new Schema<ICommunity>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// community model
const Community =
  (mongoose.models.Community as mongoose.Model<ICommunity>) ||
  model<ICommunity>("Community", communitySchema);

export default Community;
