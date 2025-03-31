import { createSchema } from 'graphql-yoga';
import { InputValidationSchema } from '@shared/schemas.js';

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    input TextInput {
      content: String!
    }

    type ValidationResult {
      valid: Boolean!
      errors: [String!]
    }

    type Query {
      hello: String!
    }

    type Mutation {
      validateInput(input: TextInput!): ValidationResult!
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Welcome to the text validation API!',
    },
    Mutation: {
      validateInput: (_, { input }) => {
        // Using Zod schema for input validation
        const result = InputValidationSchema.safeParse(input.content);

        if (result.success) {
          return {
            valid: true,
            errors: null,
          };
        } else {
          return {
            valid: false,
            errors: result.error.errors.map((err) => err.message),
          };
        }
      },
    },
  },
});
