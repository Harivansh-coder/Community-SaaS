// user router for user signup, login and profile

import express from "express";
import {
  userSignupController,
  userLoginController,
  getUserProfileController,
} from "@/controller/user";
import { userSignupSchema, userLoginSchema } from "@/schema/user";
import validateRequestBody from "@/middleware/validate";
import verifyAccessToken from "@/middleware/auth";

// express router instance
const userRouter: express.Router = express.Router();

// user signup route
userRouter.post(
  "/signup",
  validateRequestBody(userSignupSchema),
  userSignupController
);
// user login route
userRouter.post(
  "/signin",
  validateRequestBody(userLoginSchema),
  userLoginController
);

// user profile route
userRouter.get("/me", verifyAccessToken, getUserProfileController);
export default userRouter;
