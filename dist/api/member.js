"use strict";
// member router implementation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const member_1 = require("../controllers/member");
const auth_1 = __importDefault(require("../middleware/auth"));
const userAccess_1 = __importDefault(require("../middleware/userAccess"));
const validate_1 = __importDefault(require("../middleware/validate"));
const member_2 = require("../schema/member");
const express_1 = __importDefault(require("express"));
// express router instance
const memberRouter = express_1.default.Router();
// add member route
memberRouter.post("/", auth_1.default, userAccess_1.default, (0, validate_1.default)(member_2.memberSchema), member_1.addMemberController);
// remove member route
memberRouter.delete("/:memberId", auth_1.default, userAccess_1.default, member_1.removeMemberController);
exports.default = memberRouter;
