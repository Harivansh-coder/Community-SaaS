"use strict";
// loader file for database connection to ensure that the connection is established before the server starts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../env");
const logger_1 = __importDefault(require("../universe/v1/libraries/logger"));
// connect to MongoDB Loader
const ConnectToMongoDBLoader = async () => {
    try {
        await mongoose_1.default.connect(env_1.envVariables.MONGO_URL || "", {});
        logger_1.default.instance.info("Connected to MongoDB");
    }
    catch (error) {
        logger_1.default.instance.error("Error connecting to MongoDB: ", error);
    }
};
exports.default = ConnectToMongoDBLoader;
