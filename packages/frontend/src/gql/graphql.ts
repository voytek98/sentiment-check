/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: 'Mutation';
  analyzeSentiment: SentimentResult;
};

export type MutationAnalyzeSentimentArgs = {
  input: TextInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
};

export type SentimentResult = {
  __typename?: 'SentimentResult';
  label: Scalars['String']['output'];
  score: Scalars['Float']['output'];
};

export type TextInput = {
  content: Scalars['String']['input'];
};

export type AnalyzeSentimentMutationVariables = Exact<{
  input: TextInput;
}>;

export type AnalyzeSentimentMutation = {
  __typename?: 'Mutation';
  analyzeSentiment: { __typename?: 'SentimentResult'; label: string; score: number };
};

export const AnalyzeSentimentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AnalyzeSentiment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'TextInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'analyzeSentiment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AnalyzeSentimentMutation, AnalyzeSentimentMutationVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: 'Mutation';
  analyzeSentiment: SentimentResult;
};

export type MutationAnalyzeSentimentArgs = {
  input: TextInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
};

export type SentimentResult = {
  __typename?: 'SentimentResult';
  label: Scalars['String']['output'];
  score: Scalars['Float']['output'];
};

export type TextInput = {
  content: Scalars['String']['input'];
};

export type AnalyzeSentimentMutationVariables = Exact<{
  input: TextInput;
}>;

export type AnalyzeSentimentMutation = {
  __typename?: 'Mutation';
  analyzeSentiment: { __typename?: 'SentimentResult'; label: string; score: number };
};

export const AnalyzeSentimentDocument = `
    mutation AnalyzeSentiment($input: TextInput!) {
  analyzeSentiment(input: $input) {
    label
    score
  }
}
    `;

export const useAnalyzeSentimentMutation = <TError = unknown, TContext = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  options?: UseMutationOptions<AnalyzeSentimentMutation, TError, AnalyzeSentimentMutationVariables, TContext>,
) => {
  return useMutation<AnalyzeSentimentMutation, TError, AnalyzeSentimentMutationVariables, TContext>(
    ['AnalyzeSentiment'],
    (variables?: AnalyzeSentimentMutationVariables) =>
      fetcher<AnalyzeSentimentMutation, AnalyzeSentimentMutationVariables>(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        AnalyzeSentimentDocument,
        variables,
      )(),
    options,
  );
};
