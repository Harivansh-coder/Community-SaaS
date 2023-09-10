// member entity schema implementation

import { z } from "zod";

// zod schema for member entity
export const memberSchema = z.object({
  community: z.string().uuid({ message: "Invalid community id" }),
  user: z.string().uuid({ message: "Invalid user id" }),
  role: z.string().uuid({ message: "Invalid role id" }),
});
