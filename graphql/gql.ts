/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query AiAutoComplete($prefix: String!, $suffix: String!, $lang: String!) {\n    aiAutoComplete(prefix: $prefix, suffix: $suffix, lang: $lang)\n  }\n": types.AiAutoCompleteDocument,
    "\n  query AiImageToText($base64Img: String!, $prompt: String!) {\n    aiImageToText(base64Img: $base64Img, prompt: $prompt)\n  }\n": types.AiImageToTextDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AiAutoComplete($prefix: String!, $suffix: String!, $lang: String!) {\n    aiAutoComplete(prefix: $prefix, suffix: $suffix, lang: $lang)\n  }\n"): typeof import('./graphql').AiAutoCompleteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AiImageToText($base64Img: String!, $prompt: String!) {\n    aiImageToText(base64Img: $base64Img, prompt: $prompt)\n  }\n"): typeof import('./graphql').AiImageToTextDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
