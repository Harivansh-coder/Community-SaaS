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
        // get if of community admin role
        const communityAdminRole = await role_1.default.findOne({
            name: "Community Admin",
        });
        if (req.method === "POST") {
            // check if logged in user is allowed
            const { community } = req.body;
            const isAllowed = await member_1.default.exists({
                user: loggedInUserId,
                community,
                role: communityAdminRole?._id,
            });
            if (!isAllowed) {
                return res.status(403).send({
                    status: false,
                    errors: {
                        error: "You are not allowed to perform this action",
                    },
                });
            }
        }
        else if (req.method === "DELETE") {
            // this is for the delete route
            const { memberId } = req.params;
            // find the community of the member
            const member = await member_1.default.findById(memberId);
            // check if member with the id exists
            if (!member) {
                return res.status(404).send({
                    status: false,
                    errors: {
                        error: "Member not found",
                    },
                });
            }
            // check if logged in user is allowed
            const isAllowed = await member_1.default.exists({
                user: loggedInUserId,
                community: member?.community,
                role: communityAdminRole?._id,
            });
            if (!isAllowed) {
                return res.status(403).send({
                    status: false,
                    errors: {
                        error: "You are not allowed to perform this action",
                    },
                });
            }
        }
        // if allowed, call next middleware
        return next();
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            errors: {
                error: error.errors,
            },
        });
    }
};
exports.default = userAccessCheck;
