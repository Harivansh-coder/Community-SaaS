"use strict";
// user router for user signup, login and profile
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const user_2 = require("../schema/user");
const validate_1 = __importDefault(require("../middleware/validate"));
const auth_1 = __importDefault(require("../middleware/auth"));
// express router instance
const userRouter = express_1.default.Router();
// user signup route
userRouter.post("/signup", (0, validate_1.default)(user_2.userSignupSchema), user_1.userSignupController);
// user login route
userRouter.post("/signin", (0, validate_1.default)(user_2.userBaseSchema), user_1.userLoginController);
// user profile route
userRouter.get("/me", auth_1.default, user_1.getUserProfileController);
exports.default = userRouter;
