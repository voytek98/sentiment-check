import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { schema } from './schema.js';

const yoga = createYoga({ schema });

const server = createServer(yoga);

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}/graphql`);
});
