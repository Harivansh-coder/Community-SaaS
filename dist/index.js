"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const server_1 = __importDefault(require("./server"));
const env_1 = require("./env");
const logger_1 = __importDefault(require("./universe/v1/libraries/logger"));
// start the server
(async () => {
    // create express application instance and load all the basic middleware by calling server function
    const app = await (0, server_1.default)();
    // start the express server
    app.listen(env_1.envVariables.PORT, () => logger_1.default.instance.info(`Server started on port ${env_1.envVariables.PORT}`));
})();
