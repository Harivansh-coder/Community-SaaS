"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const user_1 = __importDefault(require("./router/user"));
const role_1 = __importDefault(require("./router/role"));
const community_1 = __importDefault(require("./router/community"));
const member_1 = __importDefault(require("./router/member"));
// create a new express application instance
const app = (0, express_1.default)();
// middleware for parsing application/json
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
// connect to MongoDB and start the express server
mongoose_1.default
    .connect(env_1.envVariables.MONGO_URL || "", {})
    .then(() => {
    console.log("MongoDB connected");
    app.listen(env_1.envVariables.PORT, () => {
        console.log(`Server started at http://localhost:${env_1.envVariables.PORT}`);
    });
})
    .catch((err) => {
    console.log(err);
});
