import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import { envVariables } from "@/env";
import userRouter from "@/router/user";
import roleRouter from "./router/role";
import communityRouter from "./router/community";
import memberRouter from "./router/member";

// create a new express application instance
const app = express();

// middleware for parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// connect to MongoDB
mongoose
  .connect(envVariables.MONGO_URL || "", {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

// Export the app for Vercel
export default app;

// Start server locally when not in a serverless environment
if (process.env.NODE_ENV !== "production") {
  const port = envVariables.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}
