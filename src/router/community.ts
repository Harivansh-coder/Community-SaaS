// community router implementation

import {
  createCommunityController,
  getAllCommunitiesController,
  getAllMembersController,
  getMyJoinedCommunitiesController,
  getMyOwnedCommunitiesController,
} from "@/controller/community";
import verifyAccessToken from "@/middleware/auth";
import validateRequestBody from "@/middleware/validate";
import { communitySchema } from "@/schema/community";
import express from "express";

// express router instance
const communityRouter = express.Router();

// create community route
communityRouter.post(
  "/",
  verifyAccessToken,
  validateRequestBody(communitySchema),
  createCommunityController
);

// get all communities route
communityRouter.get("/", getAllCommunitiesController);

// get all members of a community route
communityRouter.get("/:id/members", getAllMembersController);

// get all my owned communities route
communityRouter.get("/me/owner", getMyOwnedCommunitiesController);

// get all my joined communities route
communityRouter.get("/me/member", getMyJoinedCommunitiesController);

export default communityRouter;
