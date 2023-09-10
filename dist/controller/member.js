"use strict";
// member controller implementation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMemberController = exports.addMemberController = void 0;
const member_1 = __importDefault(require("@/model/member"));
const mongoose_1 = __importDefault(require("mongoose"));
// create member controller
const addMemberController = async (req, res) => {
    try {
        // get member data from request body
        const { community, user, role } = req.body;
        // create member instance from member model
        const member = new member_1.default({ community, user, role });
        // check if member already exists
        const existingMember = await member_1.default.findOne({
            community,
            user,
            role,
        });
        if (existingMember) {
            return res.status(400).send({
                status: false,
                content: {
                    error: "Member already exists",
                },
            });
        }
        // save member in database
        const savedMember = await member.save();
        // send success response
        return res.status(201).send({
            status: true,
            content: {
                data: savedMember,
            },
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({
                status: false,
                content: {
                    error: "Member already exists",
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
exports.addMemberController = addMemberController;
// remove member controller
const removeMemberController = async (req, res) => {
    try {
        const { id } = req.params;
        // check if id is valid
        if (!id || !mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).send({
                status: false,
                content: {
                    error: "Invalid member id",
                },
            });
        }
        // remove member from database
        const removedMember = await member_1.default.findByIdAndRemove(id);
        // check if member exists
        if (!removedMember) {
            return res.status(404).send({
                status: false,
                content: {
                    error: "Member not found",
                },
            });
        }
        // send success response
        return res.status(200).send({
            status: true,
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
exports.removeMemberController = removeMemberController;
