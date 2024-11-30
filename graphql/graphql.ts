/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  aiAutoComplete: Scalars['String']['output'];
  aiImageToText: Scalars['String']['output'];
  aiMediaToText: Scalars['String']['output'];
  generateText: Scalars['String']['output'];
};


export type QueryAiAutoCompleteArgs = {
  lang: Scalars['String']['input'];
  prefix: Scalars['String']['input'];
  suffix: Scalars['String']['input'];
};


export type QueryAiImageToTextArgs = {
  base64Img: Scalars['String']['input'];
  prompt?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAiMediaToTextArgs = {
  file_url: Scalars['String']['input'];
};


export type QueryGenerateTextArgs = {
  instruction: Scalars['String']['input'];
  prompt: Scalars['String']['input'];
};

export type AiAutoCompleteQueryVariables = Exact<{
  prefix: Scalars['String']['input'];
  suffix: Scalars['String']['input'];
  lang: Scalars['String']['input'];
}>;


export type AiAutoCompleteQuery = { __typename?: 'Query', aiAutoComplete: string };

export type AiImageToTextQueryVariables = Exact<{
  base64Img: Scalars['String']['input'];
  prompt: Scalars['String']['input'];
}>;


export type AiImageToTextQuery = { __typename?: 'Query', aiImageToText: string };

export type AiVideoToTextQueryVariables = Exact<{
  file_url: Scalars['String']['input'];
}>;


export type AiVideoToTextQuery = { __typename?: 'Query', aiMediaToText: string };

export type AiSummarizeTextQueryVariables = Exact<{
  instruction: Scalars['String']['input'];
  prompt: Scalars['String']['input'];
}>;


export type AiSummarizeTextQuery = { __typename?: 'Query', generateText: string };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any> | undefined) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AiAutoCompleteDocument = new TypedDocumentString(`
    query AiAutoComplete($prefix: String!, $suffix: String!, $lang: String!) {
  aiAutoComplete(prefix: $prefix, suffix: $suffix, lang: $lang)
}
    `) as unknown as TypedDocumentString<AiAutoCompleteQuery, AiAutoCompleteQueryVariables>;
export const AiImageToTextDocument = new TypedDocumentString(`
    query AiImageToText($base64Img: String!, $prompt: String!) {
  aiImageToText(base64Img: $base64Img, prompt: $prompt)
}
    `) as unknown as TypedDocumentString<AiImageToTextQuery, AiImageToTextQueryVariables>;
export const AiVideoToTextDocument = new TypedDocumentString(`
    query AiVideoToText($file_url: String!) {
  aiMediaToText(file_url: $file_url)
}
    `) as unknown as TypedDocumentString<AiVideoToTextQuery, AiVideoToTextQueryVariables>;
export const AiSummarizeTextDocument = new TypedDocumentString(`
    query AiSummarizeText($instruction: String!, $prompt: String!) {
  generateText(instruction: $instruction, prompt: $prompt)
}
    `) as unknown as TypedDocumentString<AiSummarizeTextQuery, AiSummarizeTextQueryVariables>;