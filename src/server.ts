// server.ts is the entry point for the application and responsible for starting the express server
import express from "express";
import FrameworkLoader from "@/loaders/framework";
import userRouter from "@/api/user";
import roleRouter from "@/api/role";
import communityRouter from "@/api/community";
import memberRouter from "@/api/member";
import ConnectToMongoDBLoader from "@/loaders/database";
import CustomLogger from "@/universe/v1/libraries/logger";

// creating a new server that will return an express application instance
const server = async (): Promise<express.Application> => {
  // new express application instance
  const app = express();

  // Loaders
  // load logger class
  CustomLogger.Loader();

  // load all the basic middleware for the express application
  FrameworkLoader(app);

  // load database connection
  await ConnectToMongoDBLoader();

  // define route handler
  // define a route handler for the default home page
  app.get("/v1", (_req: express.Request, res: express.Response) => {
    res.send("The sedulous hyena ate the antelope!");
  });

  // define a route handler for user routes
  app.use("/v1/auth", userRouter);

  // define a route handler for role routes
  app.use("/v1/role", roleRouter);

  // define a route handler for community routes
  app.use("/v1/community", communityRouter);

  // define a route handler for member routes
  app.use("/v1/member", memberRouter);

  // return the express application instance
  return app;
};

export default server;
