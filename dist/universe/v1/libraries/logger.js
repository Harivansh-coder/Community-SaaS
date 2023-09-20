"use strict";
// logger class for logging messages with different levels of severity implemented using winston
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// creating a logger class
class CustomLogger {
    static instance;
    // creating a logger instance
    static Loader = () => {
        // define the format of the logger
        const loggerFormat = winston_1.format.combine(winston_1.format.cli(), winston_1.format.splat(), winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message} ${info.stack ? info.stack : ""}`));
        // create a logger instance for info level
        CustomLogger.instance = (0, winston_1.createLogger)({
            level: "info",
            format: loggerFormat,
            transports: [
                new winston_1.transports.Console(),
                new winston_1.transports.File({ filename: "logs/combined.log" }),
            ],
        });
    };
}
exports.default = CustomLogger;
