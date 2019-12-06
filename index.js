const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema, transformSchema, WrapType } = require('graphql-tools-fork');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Note {
    title: String
  }

  type Example {
    title: String
    somestuff: String
  }

  type Query {
    books: [Book]
    notes: [Note]
    example: Example
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const notes = [
  {
    title: 'Please say me what time it is',
  },
  {
    title: 'Travel arround the World',
  },
];

const example = {
  title: "a title",
  somestuff: "2wedcf3dferg"
}

const resolvers = {
  Query: {
    books: () => books,
    notes: () => notes,
    example: () => example,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const transformedSchema = transformSchema(schema, [
  new WrapType('Query', 'Testing', 'testing'),
]);

const server = new ApolloServer({ 
  schema: transformedSchema 
});

server.listen({port: 4001}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});