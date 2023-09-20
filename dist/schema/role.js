"use strict";
// role entity schema
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleSchema = void 0;
const zod_1 = require("zod");
// zod schema for role entity
exports.roleSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters long" }),
});
