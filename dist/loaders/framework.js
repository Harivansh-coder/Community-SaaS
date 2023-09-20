"use strict";
// framework.ts is the entry point for the framework library and responsible for exporting all basic middleware
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// cors configuration
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
// FrameworkLoader is a function that loads all the basic middleware for the express application
const FrameworkLoader = (app) => {
    // middleware for parsing application/json
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // middleware for enabling cors
    app.use((0, cors_1.default)(corsOptions));
};
exports.default = FrameworkLoader;
