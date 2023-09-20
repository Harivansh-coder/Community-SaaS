"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariables = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
// initialize env variables
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z
        .string()
        .default("3000")
        .transform((val) => parseInt(val)),
    MONGO_URL: zod_1.z.string().trim(),
    JWT_SECRET_KEY: zod_1.z.string().trim(),
});
const env = envSchema.safeParse({
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
});
if (!env.success) {
    throw new Error(env.error.message);
}
exports.envVariables = env.data;
