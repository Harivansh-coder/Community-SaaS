// pagination query validation suing zod

import { z } from "zod";

function safeNum(val: string, defaultNumber: number) {
  const num = Number(val);
  if (isNaN(num)) return defaultNumber;
  return num;
}

// zod schema for pagination query
export const paginationQuery = z.object({
  page: z
    .string()
    .optional()
    .transform((page) => {
      const num = safeNum(page ?? "", 1);

      if (num < 1) {
        return 1;
      }
      return num;
    }),

  limit: z
    .string()
    .optional()
    .transform((limit) => {
      const num = safeNum(limit ?? "", LIMIT);

      if (num > LIMIT || num <= 0) {
        return LIMIT;
      }
      return num;
    }),
});

export const LIMIT = 10;
