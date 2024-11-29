import client from "@/lib/env/client";
import type { TypedDocumentString } from "./graphql";

let GRAPHQL_URL: string;

if (process.env.NODE_ENV === "production") {
  GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_PRODUCTION_URL!;
} else {
  GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_DEV_URL!;
}

if (!GRAPHQL_URL) {
  throw new Error("Unable to find env variable GRAPHQL_URL");
}

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  console.log("GRAPHQL_URL", GRAPHQL_URL);

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json() as Promise<{ data: TResult }>;
}
