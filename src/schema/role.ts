// role entity schema

import { z } from "zod";

// zod schema for role entity
export const roleSchema = z.object({
  name: z.string().trim().min(3, { message: "Name too short" }),
});
