"use strict";
// role controller implementation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRolesController = exports.createRoleController = void 0;
const role_1 = __importDefault(require("@/model/role"));
// create role controller
const createRoleController = async (req, res) => {
    try {
        // get role data from request body
        const { name } = req.body;
        // create role instance from role model
        const role = new role_1.default({ name });
        // save role in database
        const savedRole = await role.save();
        // send success response
        return res.status(201).send({
            status: true,
            content: {
                data: savedRole,
            },
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({
                status: false,
                content: {
                    error: "Role already exists",
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
exports.createRoleController = createRoleController;
// get all roles controller
const getAllRolesController = async (_req, res) => {
    try {
        // get all roles from database
        const roles = await role_1.default.find({}).lean();
        // send success response
        return res.status(200).send({
            status: true,
            content: {
                data: roles,
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
exports.getAllRolesController = getAllRolesController;
