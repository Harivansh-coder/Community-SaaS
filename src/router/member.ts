// member router implementation

import {
  addMemberController,
  removeMemberController,
} from "@/controller/member";
import validateRequestBody from "@/middleware/validate";
import { memberSchema } from "@/schema/member";
import express from "express";

// express router instance
const memberRouter = express.Router();

// add member route
memberRouter.post("/", validateRequestBody(memberSchema), addMemberController);

// remove member route
memberRouter.delete("/:id", removeMemberController);

export default memberRouter;
