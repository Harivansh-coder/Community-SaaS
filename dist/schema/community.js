"use strict";
// community entity schema implementation
Object.defineProperty(exports, "__esModule", { value: true });
exports.communitySchema = void 0;
const zod_1 = require("zod");
// zod schema for community entity
exports.communitySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(3, { message: "Name too short" })
        .max(50, { message: "Name too long" }),
});
