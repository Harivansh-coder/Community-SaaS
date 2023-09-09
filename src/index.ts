import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import { envVariables } from "@/env";

// create a new express application instance
const app: express.Application = express();

// define a route handler for the default home page
app.get("/v1", (_req: express.Request, res: express.Response) => {
  res.send("The sedulous hyena ate the antelope!");
});

// define a route handler for user signup
app.post("/v1/auth/signup", (_req: express.Request, res: express.Response) => {
  res.send("User signup");
});

// define a route handler for user login
app.post("/v1/auth/signin", (_req: express.Request, res: express.Response) => {
  res.send("User login");
});

app.get("/v1/auth/me", (_req: express.Request, res: express.Response) => {
  res.send("User profile");
});

// connect to MongoDB and start the express server
mongoose
  .connect(envVariables.MONGO_URL || "", {})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(envVariables.PORT, () => {
      console.log(`Server started at http://localhost:${envVariables.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
