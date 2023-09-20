// loader file for database connection to ensure that the connection is established before the server starts

import mongoose from "mongoose";
import { envVariables } from "@/env";
import CustomLogger from "@/libraries/logger";
// connect to MongoDB Loader
const ConnectToMongoDBLoader = async (): Promise<void> => {
  try {
    await mongoose.connect(envVariables.MONGO_URL || "", {});
    CustomLogger.instance.info("Connected to MongoDB");
  } catch (error) {
    CustomLogger.instance.error("Error connecting to MongoDB: ", error);
  }
};

export default ConnectToMongoDBLoader;
