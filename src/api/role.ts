// role router implementation

import {
  createRoleController,
  getAllRolesController,
} from "@/controllers/role";
import validateRequestBody from "@/middleware/validate";
import { roleSchema } from "@/schema/role";
import express from "express";

// express route instance
const roleRouter = express.Router();

// create role route
roleRouter.post("/", validateRequestBody(roleSchema), createRoleController);

// get all roles route
roleRouter.get("/", getAllRolesController);

export default roleRouter;
