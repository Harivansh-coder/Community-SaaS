// user schema for request body validation

import { z } from "zod";

// zod schema for base user schema

export const userBaseSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password exceeds the maximum limit of characters" }),
});

// zod schema for user signup
export const userSignupSchema = userBaseSchema.extend({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name too long" }),
});
