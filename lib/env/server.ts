import { z } from "zod";

const envSchema = z.object({
  ASSEMBLYAI_API_KEY: z.string().trim().min(1),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

console.log("env", process.env.NODE_ENV);

export default envSchema.parse(process.env);
