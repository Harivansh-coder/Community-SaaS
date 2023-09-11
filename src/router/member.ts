// member router implementation

import {
  addMemberController,
  removeMemberController,
} from "@/controller/member";
import verifyAccessToken from "@/middleware/auth";
import userAccessCheck from "@/middleware/userAccess";
import validateRequestBody from "@/middleware/validate";
import { memberSchema } from "@/schema/member";
import express from "express";

// express router instance
const memberRouter = express.Router();

// add member route
memberRouter.post(
  "/",
  verifyAccessToken,
  userAccessCheck,
  validateRequestBody(memberSchema),
  addMemberController
);

// remove member route
memberRouter.delete(
  "/:memberId",
  verifyAccessToken,
  userAccessCheck,
  removeMemberController
);

export default memberRouter;
