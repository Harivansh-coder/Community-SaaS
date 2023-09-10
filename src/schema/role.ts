// role entity schema

import { z } from "zod";

// zod schema for role entity
export const roleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" }),
});
