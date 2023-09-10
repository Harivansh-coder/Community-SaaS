"use strict";
// community controller implementation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyJoinedCommunitiesController = exports.getMyOwnedCommunitiesController = exports.getAllMembersController = exports.getAllCommunitiesController = exports.createCommunityController = void 0;
const community_1 = __importDefault(require("@/model/community"));
const member_1 = __importDefault(require("@/model/member"));
const role_1 = __importDefault(require("@/model/role"));
const mongoose_1 = __importDefault(require("mongoose"));
// create community controller
const createCommunityController = async (req, res) => {
    try {
        // get community data from request body
        const { name } = req.body;
        const slug = name.toLowerCase().split(" ").join("-");
        const owner = req.user?.id;
        // create community instance from community model
        const community = new community_1.default({ name, slug, owner });
        // save community in database
        const savedCommunity = await community.save();
        // get the admin role id
        const adminRoleId = await role_1.default.findOne({ name: "Community Admin" });
        // add current user as community admin
        const newMember = new member_1.default({
            community: savedCommunity._id,
            user: owner,
            role: adminRoleId?._id,
        });
        // save member in database
        await newMember.save();
        // send success response
        return res.status(201).send({
            status: true,
            content: {
                data: savedCommunity,
            },
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({
                status: false,
                content: {
                    error: "Community already exists",
                },
            });
        }
        else {
            return res.status(500).send({
                status: false,
                content: {
                    error: error.message,
                },
            });
        }
    }
};
exports.createCommunityController = createCommunityController;
// get all communities controller
const getAllCommunitiesController = async (_req, res) => {
    try {
        // get all communities from database and populate owner name
        const communities = await community_1.default.find({})
            .populate("owner", "name")
            .lean();
        // send success response
        return res.status(200).send({
            status: true,
            content: {
                data: communities,
            },
        });
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
exports.getAllCommunitiesController = getAllCommunitiesController;
// get all members of a community controller
const getAllMembersController = async (_req, res) => {
    try {
        const communitySlug = _req.params.id;
        // get community id from database
        const communityId = await community_1.default.findOne({ slug: communitySlug }).lean();
        // check if community exists
        if (!communityId) {
            return res.status(404).send({
                status: false,
                errors: {
                    message: "Community not found",
                },
            });
        }
        // get all members of a community from database
        const allMembersOfCurrentCommunity = await member_1.default.find({
            community: communityId,
        })
            .populate("user", "name")
            .populate("role", "name")
            .lean();
        // send success response
        return res.status(200).send({
            status: true,
            content: {
                data: allMembersOfCurrentCommunity,
            },
        });
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            errors: {
                message: error.message,
            },
        });
    }
};
exports.getAllMembersController = getAllMembersController;
// get all my owned communities controller
const getMyOwnedCommunitiesController = async (req, res) => {
    // get all my owned communities from database
    try {
        const userId = req.user?.id;
        // check if user id is valid
        if (!mongoose_1.default.isValidObjectId(userId)) {
            return res.status(400).send({
                status: false,
                errors: {
                    message: "Invalid user id",
                },
            });
        }
        // get all my owned communities from database
        const myOwnedCommunities = await community_1.default.find({ owner: userId }).lean();
        // send success response
        return res.status(200).send({
            status: true,
            content: {
                data: myOwnedCommunities,
            },
        });
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            errors: {
                message: error.message,
            },
        });
    }
};
exports.getMyOwnedCommunitiesController = getMyOwnedCommunitiesController;
// get all my joined communities controller
const getMyJoinedCommunitiesController = async (req, res) => {
    // get all my joined communities from database
    try {
        const userId = req.user?.id;
        // check if user id is valid
        if (!mongoose_1.default.isValidObjectId(userId)) {
            return res.status(400).send({
                status: false,
                errors: {
                    message: "Invalid user id",
                },
            });
        }
        // get the list of all community id in which user is a member
        const myJoinedCommunitiesIds = await member_1.default.find({ user: userId }).distinct("community");
        // get all my joined communities from database
        const myJoinedCommunities = await community_1.default.find({
            _id: { $in: myJoinedCommunitiesIds },
        })
            .populate("owner", "name")
            .lean();
        // send success response
        return res.status(200).send({
            status: true,
            content: {
                data: myJoinedCommunities,
            },
        });
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            errors: {
                message: error.message,
            },
        });
    }
};
exports.getMyJoinedCommunitiesController = getMyJoinedCommunitiesController;
