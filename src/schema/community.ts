// community entity schema implementation

import { z } from "zod";

// zod schema for community entity
export const communitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name too short" })
    .max(50, { message: "Name too long" }),
});
