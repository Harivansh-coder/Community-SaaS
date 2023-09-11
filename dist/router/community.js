"use strict";
// community router implementation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const community_1 = require("@/controller/community");
const auth_1 = __importDefault(require("@/middleware/auth"));
const validate_1 = __importDefault(require("@/middleware/validate"));
const community_2 = require("@/schema/community");
const express_1 = __importDefault(require("express"));
// express router instance
const communityRouter = express_1.default.Router();
// create community route
communityRouter.post("/", auth_1.default, (0, validate_1.default)(community_2.communitySchema), community_1.createCommunityController);
// get all communities route
communityRouter.get("/", community_1.getAllCommunitiesController);
// get all members of a community route
communityRouter.get("/:id/members", community_1.getAllMembersController);
// get all my owned communities route
communityRouter.get("/me/owner", auth_1.default, community_1.getMyOwnedCommunitiesController);
// get all my joined communities route
communityRouter.get("/me/member", auth_1.default, community_1.getMyJoinedCommunitiesController);
exports.default = communityRouter;
