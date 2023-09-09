import { z } from "zod";
import dotenv from "dotenv";

// initialize env variables
dotenv.config();

const envSchema = z.object({
  PORT: z
    .string()
    .default("3000")
    .transform((val) => parseInt(val)),
  MONGO_URL: z.string().trim(),
  JWT_SECRET_KEY: z.string().trim(),
});

const env = envSchema.safeParse({
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
});

if (!env.success) {
  throw new Error(env.error.message);
}

export const envVariables = env.data;
