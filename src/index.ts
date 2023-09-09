import express from "express";
import mongoose from "mongoose";
import { envVariables } from "./env";

// create a new express application instance
const app: express.Application = express();

// define a route handler for the default home page
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello " + req.query.name);
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
