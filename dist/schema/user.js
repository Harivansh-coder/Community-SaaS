"use strict";
// user schema for request body validation
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignupSchema = exports.userBaseSchema = void 0;
const zod_1 = require("zod");
// zod schema for base user schema
exports.userBaseSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email({ message: "Invalid email" }),
    password: zod_1.z
        .string()
        .trim()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(50, { message: "Password exceeds the maximum limit of characters" }),
});
// zod schema for user signup
exports.userSignupSchema = exports.userBaseSchema.extend({
    name: zod_1.z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name too long" }),
});
