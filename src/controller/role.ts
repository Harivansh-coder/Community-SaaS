// role controller implementation

import { Request, Response } from "express";

// create role controller
export const createRoleController = async (_req: Request, res: Response) => {
  res.send("create role controller");
};

// get all roles controller
export const getAllRolesController = async (_req: Request, res: Response) => {
  res.send("get all roles controller");
};
