// loader file for database connection to ensure that the connection is established before the server starts

import mongoose from "mongoose";
import { envVariables } from "@/env";
import logger from "@/libraries/logger";

// connect to MongoDB Loader
const ConnectToMongoDBLoader = async (): Promise<void> => {
  try {
    await mongoose.connect(envVariables.MONGO_URL || "", {});
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB: ", error);
  }
};

export default ConnectToMongoDBLoader;
