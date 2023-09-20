"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts is the entry point for the application and responsible for starting the express server
const express_1 = __importDefault(require("express"));
const framework_1 = __importDefault(require("./libraries/framework"));
const user_1 = __importDefault(require("./router/user"));
const role_1 = __importDefault(require("./router/role"));
const community_1 = __importDefault(require("./router/community"));
const member_1 = __importDefault(require("./router/member"));
const database_1 = __importDefault(require("./libraries/database"));
const logger_1 = __importDefault(require("./libraries/logger"));
// creating a new server that will return an express application instance
const server = async () => {
    // new express application instance
    const app = (0, express_1.default)();
    // Loaders
    // load logger class
    logger_1.default.Loader();
    // load all the basic middleware for the express application
    (0, framework_1.default)(app);
    // load database connection
    await (0, database_1.default)();
    // define route handler
    // define a route handler for the default home page
    app.get("/v1", (_req, res) => {
        res.send("The sedulous hyena ate the antelope!");
    });
    // define a route handler for user routes
    app.use("/v1/auth", user_1.default);
    // define a route handler for role routes
    app.use("/v1/role", role_1.default);
    // define a route handler for community routes
    app.use("/v1/community", community_1.default);
    // define a route handler for member routes
    app.use("/v1/member", member_1.default);
    // return the express application instance
    return app;
};
exports.default = server;
