import type { TypedDocumentString } from "./graphql";

let GRAPHQL_URL: string;
let HYPERMODE_API_KEY: string | null;

if (process.env.NODE_ENV === "production") {
  HYPERMODE_API_KEY = process.env.NEXT_PUBLIC_HYPERMODE_API_KEY!;
  GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_PRODUCTION_URL!;
} else {
  HYPERMODE_API_KEY = null;
  GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_DEV_URL!;
}

if (!GRAPHQL_URL) {
  throw new Error("Unable to find env variable [GRAPHQL_URL]");
}

if (!HYPERMODE_API_KEY && process.env.NODE_ENV === "production") {
  throw new Error(
    "Unable to find env variable [NEXT_PUBLIC_HYPERMODE_API_KEY]",
  );
}

const headers: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: "application/graphql-response+json",
};

// Only set the Authorization header in production
if (process.env.NODE_ENV === "production" && HYPERMODE_API_KEY) {
  headers.Authorization = `Bearer ${HYPERMODE_API_KEY}`;
}

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json() as Promise<{
    data: TResult;
    errors?: { message: string }[];
  }>;
}
