// member entity schema implementation

import { z } from "zod";

// zod schema for member entity
export const memberSchema = z.object({
  community: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid community id" }),
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid user id" }),
  role: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid role id" }),
});
