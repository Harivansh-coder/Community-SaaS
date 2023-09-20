// framework.ts is the entry point for the framework library and responsible for exporting all basic middleware

import express from "express";
import cors from "cors";

// cors configuration
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


// FrameworkLoader is a function that loads all the basic middleware for the express application

const FrameworkLoader = (app: express.Application) => {
  // middleware for parsing application/json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // middleware for enabling cors
  app.use(cors(corsOptions));

}

export default FrameworkLoader;