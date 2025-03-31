import { createGraphQLError, createSchema } from 'graphql-yoga';
import { InputValidationSchema } from '@shared/schemas';
import { analyzeWithHF } from './huggingface';

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    input TextInput {
      content: String!
    }

    type Query {
      hello: String!
    }

    type SentimentResult {
      label: String!
      score: Float!
    }

    type Mutation {
      analyzeSentiment(input: TextInput!): SentimentResult!
    }
  `,
  resolvers: {
    Mutation: {
      analyzeSentiment: async (_, { input }) => {
        const inputValidation = InputValidationSchema.safeParse(input.content);

        if (!inputValidation.success) {
          throw createGraphQLError('Invalid input');
        }

        const sentiment = await analyzeWithHF(input.content);
        return sentiment;
      },
    },
  },
});
