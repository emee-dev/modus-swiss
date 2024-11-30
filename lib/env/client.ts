import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY: z.string().trim().min(1),
  NEXT_PUBLIC_GRAPHQL_URL: z
    .string()
    .trim()
    .min(1)
    .default("http://localhost:8686/graphql"),
  NEXT_PUBLIC_GRAPHQL_DEV_URL: z.string().trim().min(1),
  NEXT_PUBLIC_GRAPHQL_PRODUCTION_URL: z.string().trim().min(1),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export default envSchema.parse(process.env);
