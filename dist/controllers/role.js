"use strict";
// role controller implementation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRolesController = exports.createRoleController = void 0;
const role_1 = __importDefault(require("../model/role"));
const pagination_1 = require("../universe/v1/libraries/pagination");
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
const getAllRolesController = async (req, res) => {
    try {
        // parse pagination query
        const parsedPaginationQuery = pagination_1.paginationQuery.parse(req.query);
        // get page and limit from parsed query
        const { page, limit } = parsedPaginationQuery;
        // get total number of roles
        const totalRoles = await role_1.default.countDocuments({});
        // get total number of documents to skip
        const skip = (page - 1) * limit;
        // get all roles from database
        const roles = await role_1.default.find({}).skip(skip).limit(limit).lean();
        // send success response
        return res.status(200).send({
            status: true,
            content: {
                meta: {
                    total: totalRoles,
                    pages: Math.ceil(totalRoles / pagination_1.LIMIT),
                    page,
                },
                data: roles,
            },
        });
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
exports.getAllRolesController = getAllRolesController;
