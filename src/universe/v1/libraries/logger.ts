// logger class for logging messages with different levels of severity implemented using winston

import { createLogger, format, transports, Logger } from "winston";

// creating a logger class
class CustomLogger {
  static instance: Logger;

  // creating a logger instance
  static Loader = (): void => {
    // define the format of the logger
    const loggerFormat = format.combine(
      format.cli(),
      format.splat(),
      format.timestamp(),
      format.errors({ stack: true }),
      format.printf(
        (info) =>
          `${info.timestamp} ${info.level}: ${info.message} ${
            info.stack ? info.stack : ""
          }`
      )
    );

    // create a logger instance for info level
    CustomLogger.instance = createLogger({
      level: "info",
      format: loggerFormat,
      transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/combined.log" }),
      ],
    });
  };
}

export default CustomLogger;
