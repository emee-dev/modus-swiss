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
  generateText: Scalars['String']['output'];
  randomQuote: Quote;
  sayHello: Scalars['String']['output'];
  transcript: Scalars['String']['output'];
};


export type QueryGenerateTextArgs = {
  instruction: Scalars['String']['input'];
  prompt: Scalars['String']['input'];
};


export type QuerySayHelloArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTranscriptArgs = {
  apikey: Scalars['String']['input'];
  transcriptId: Scalars['String']['input'];
};

export type Quote = {
  __typename?: 'Quote';
  author: Scalars['String']['output'];
  quote: Scalars['String']['output'];
};

export type SayHelloQueryVariables = Exact<{
  first: Scalars['String']['input'];
  second: Scalars['String']['input'];
}>;


export type SayHelloQuery = { __typename?: 'Query', transcript: string };

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

export const SayHelloDocument = new TypedDocumentString(`
    query SayHello($first: String!, $second: String!) {
  transcript(transcriptId: $first, apikey: $second)
}
    `) as unknown as TypedDocumentString<SayHelloQuery, SayHelloQueryVariables>;