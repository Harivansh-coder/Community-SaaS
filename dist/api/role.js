"use strict";
// role router implementation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("../controllers/role");
const validate_1 = __importDefault(require("../middleware/validate"));
const role_2 = require("../schema/role");
const express_1 = __importDefault(require("express"));
// express route instance
const roleRouter = express_1.default.Router();
// create role route
roleRouter.post("/", (0, validate_1.default)(role_2.roleSchema), role_1.createRoleController);
// get all roles route
roleRouter.get("/", role_1.getAllRolesController);
exports.default = roleRouter;
