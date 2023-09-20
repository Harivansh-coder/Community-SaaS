"use strict";
// pagination query validation suing zod
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIMIT = exports.paginationQuery = void 0;
const zod_1 = require("zod");
function safeNum(val, defaultNumber) {
    const num = Number(val);
    if (isNaN(num))
        return defaultNumber;
    return num;
}
// zod schema for pagination query
exports.paginationQuery = zod_1.z.object({
    page: zod_1.z
        .string()
        .optional()
        .transform((page) => {
        const num = safeNum(page ?? "", 1);
        if (num < 1) {
            return 1;
        }
        return num;
    }),
    limit: zod_1.z
        .string()
        .optional()
        .transform((limit) => {
        const num = safeNum(limit ?? "", exports.LIMIT);
        if (num > exports.LIMIT || num <= 0) {
            return exports.LIMIT;
        }
        return num;
    }),
});
exports.LIMIT = 10;
