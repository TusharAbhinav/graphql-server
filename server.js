const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { resolvers } = require('./resolvers');

async function startServer() {
    // Create Express application
    const app = express();
    
    // Create executable schema
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    
    // Create Apollo Server
    const server = new ApolloServer({
        schema,
        playground: true, // Enable GraphQL playground for testing
    });

    // Start Apollo Server
    await server.start();
    
    // Apply middleware to Express
    server.applyMiddleware({ app });
    
    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer().catch(err => console.error('Error starting server:', err));
