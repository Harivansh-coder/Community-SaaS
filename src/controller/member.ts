// member controller implementation

import { Request, Response } from "express";

// create member controller
export const createMemberController = async (_req: Request, res: Response) => {
  res.send("create member controller");
};

// remove member controller
export const removeMemberController = async (_req: Request, res: Response) => {
  res.send("remove member controller");
};
