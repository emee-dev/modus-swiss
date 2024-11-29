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
// .refine(
//   (env) => {
//     if (env.NODE_ENV === "development") {
//       env.NEXT_PUBLIC_GRAPHQL_URL = env.NEXT_PUBLIC_GRAPHQL_DEV_URL ?? "";
//       return !!env.NEXT_PUBLIC_GRAPHQL_URL;
//     } else if (env.NODE_ENV === "production") {
//       env.NEXT_PUBLIC_GRAPHQL_URL =
//         env.NEXT_PUBLIC_GRAPHQL_PRODUCTION_URL ?? "";
//       return !!env.NEXT_PUBLIC_GRAPHQL_URL;
//     }
//     return true;
//   },
//   {
//     message: "GRAPHQL_URL must be properly defined based on NODE_ENV.",
//     path: ["GRAPHQL_URL"],
//   },
// );

console.log("env", process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY);

export default envSchema.parse(process.env);
