"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileController = exports.userLoginController = exports.userSignupController = void 0;
// controller for user routes
const user_1 = __importDefault(require("../model/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../universe/v1/libraries/token"));
// user signup controller
const userSignupController = async (req, res) => {
    // signup logic
    try {
        const { name, email, password } = req.body;
        // hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // save user to database
        const user = new user_1.default({
            name,
            email,
            password: hashedPassword,
        });
        // save user to database
        await user.save();
        // generate token
        const token = await (0, token_1.default)(user._id);
        // send response
        return res.status(201).send({
            status: true,
            content: {
                data: {
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    created_at: user.createdAt,
                },
                meta: {
                    access_token: token,
                },
            },
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({
                status: false,
                errors: {
                    error: "User with this email already exists",
                },
            });
        }
        else {
            return res.status(500).send({
                status: false,
                errors: {
                    error: error.errors,
                },
            });
        }
    }
};
exports.userSignupController = userSignupController;
// user login controller
const userLoginController = async (req, res) => {
    // signin logic
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({ email }).lean();
        // check if user exists
        if (!user) {
            return res.status(400).send({
                status: false,
                errors: {
                    message: "Invalid credentials",
                },
            });
        }
        // compare password
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        // check if password is valid
        if (!isPasswordValid) {
            return res.status(400).send({
                status: false,
                errors: {
                    message: "Invalid credentials",
                },
            });
        }
        // generate token
        const token = await (0, token_1.default)(user._id);
        // send response
        return res.status(200).send({
            status: true,
            content: {
                access_token: token,
                token_type: "Bearer",
            },
        });
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            errors: {
                error: error.message,
            },
        });
    }
};
exports.userLoginController = userLoginController;
// user profile controller
const getUserProfileController = async (req, res) => {
    // get user profile
    try {
        const userID = req.user?.id;
        // get user from database
        const user = await user_1.default.findById(userID).lean();
        // check if user exists
        if (!user) {
            return res.status(404).send({
                status: false,
                errors: {
                    message: "User not found",
                },
            });
        }
        // send response
        return res.status(200).send({
            status: true,
            content: {
                data: {
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    created_at: user.createdAt,
                },
            },
        });
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            errors: {
                error: error.message,
            },
        });
    }
};
exports.getUserProfileController = getUserProfileController;
