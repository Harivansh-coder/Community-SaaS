"use strict";
// member entity schema implementation
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberSchema = void 0;
const zod_1 = require("zod");
// zod schema for member entity
exports.memberSchema = zod_1.z.object({
    community: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid community id" }),
    user: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid user id" }),
    role: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid role id" }),
});
