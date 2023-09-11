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
        const { memberId } = req.params;
        // check if id is valid
        if (!memberId || !mongoose_1.default.isValidObjectId(memberId)) {
            return res.status(400).send({
                status: false,
                content: {
                    error: "Invalid member id",
                },
            });
        }
        // remove member from database
        await member_1.default.findByIdAndRemove(memberId);
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
