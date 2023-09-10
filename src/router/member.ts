// member router implementation

import {
  createMemberController,
  removeMemberController,
} from "@/controller/member";
import validateRequestBody from "@/middleware/validate";
import { memberSchema } from "@/schema/member";
import express from "express";

// express router instance
const memberRouter = express.Router();

// create member route
memberRouter.post(
  "/",
  validateRequestBody(memberSchema),
  createMemberController
);

// remove member route
memberRouter.delete("/:id", removeMemberController);

export default memberRouter;
