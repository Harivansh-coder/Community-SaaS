// community controller implementation

import { Request, Response } from "express";

// create community controller
export const createCommunityController = async (
  _req: Request,
  res: Response
) => {
  res.send("create community controller");
};

// get all communities controller
export const getAllCommunitiesController = async (
  _req: Request,
  res: Response
) => {
  res.send("get all communities controller");
};

// get all members of a community controller
export const getAllMembersController = async (_req: Request, res: Response) => {
  res.send("get all members of a community controller");
};

// get all my owned communities controller
export const getMyOwnedCommunitiesController = async (
  _req: Request,
  res: Response
) => {
  res.send("get all my owned communities controller");
};

// get all my joined communities controller
export const getMyJoinedCommunitiesController = async (
  _req: Request,
  res: Response
) => {
  res.send("get all my joined communities controller");
};
