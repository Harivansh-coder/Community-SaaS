"use strict";
// user access middleware implementation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const member_1 = __importDefault(require("@/model/member"));
const role_1 = __importDefault(require("@/model/role"));
// user access middleware
const userAccessCheck = async (req, res, next) => {
    try {
        // get user from request object
        const loggedInUserId = req.user?.id;
        // check if logged in user is allowed
        const { community } = req.body;
        // get if of community admin role
        const communityAdminRole = await role_1.default.findOne({
            name: "Community Admin",
        });
        const isAllowed = await member_1.default.findOne({
            community,
            user: loggedInUserId,
            role: communityAdminRole?._id,
        });
        if (!isAllowed) {
            return res.status(403).send({
                status: false,
                content: {
                    error: "You are not allowed to perform this action",
                },
            });
        }
        // if allowed, call next middleware
        return next();
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            content: {
                error: error.message,
            },
        });
    }
};
exports.default = userAccessCheck;
