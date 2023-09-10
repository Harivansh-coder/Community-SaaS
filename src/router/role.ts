// role router implementation

import { createRoleController, getAllRolesController } from "@/controller/role";
import express from "express";

// express route instance
const roleRouter = express.Router();

// create role route
roleRouter.post("/", createRoleController);

// get all roles route
roleRouter.get("/", getAllRolesController);

export default roleRouter;
