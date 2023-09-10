"use strict";
// auth middleware to check if user is authenticated
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("@/env");
const verifyAccessToken = async (req, res, next) => {
    // get access token from header
    const accessToken = req.headers.authorization?.split(" ")[1];
    // check if access token exists
    if (!accessToken) {
        return res.status(401).send({
            status: false,
            content: {
                message: "Unauthorized",
            },
        });
    }
    // verify access token
    try {
        const decodedToken = (await jsonwebtoken_1.default.verify(accessToken, env_1.envVariables.JWT_SECRET_KEY));
        // check if decoded token is a string
        if (typeof decodedToken !== "string") {
            req.user = decodedToken;
        }
        return next();
    }
    catch (error) {
        return res.status(401).send({
            status: false,
            content: {
                message: "Unauthorized",
            },
        });
    }
};
exports.default = verifyAccessToken;
