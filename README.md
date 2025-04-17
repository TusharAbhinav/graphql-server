# GraphQL BookStore API

A comprehensive GraphQL API for managing books, authors, and genres with full CRUD operations.

## 📚 Project Overview

This project demonstrates how to build a complete GraphQL server using Node.js, Apollo Server, and Express. It includes a robust schema design with relationships between entities, resolvers for queries and mutations, and in-memory data storage that can be easily replaced with a real database.

## 🚀 Features

- **Comprehensive Schema Design**: Well-structured GraphQL schema with types, queries, and mutations
- **Relationships**: One-to-many and many-to-many relationships between books, authors, and genres
- **Full CRUD Operations**: Create, read, update, and delete operations for all entities
- **Search Functionality**: Universal search across multiple entity types
- **Filtering & Sorting**: Query parameters for data manipulation
- **Pagination**: Offset-based pagination support

## 🛠️ Technologies Used

- **Node.js & Express**: Server foundation
- **Apollo Server**: GraphQL implementation

## 🗂️ Project Structure

```
graphql-server/
├── graphql-concepts      # GraphQL concepts and examples
├── package.json
├── server.js             # Entry point and server configuration
├── schema.js             # GraphQL schema definition
├── resolvers.js          # Resolver functions
├── mock-data.js          # Sample data for development
└── README.md             # Documentation
```

## 📋 GraphQL Schema

The API includes the following main types:

- **Book**: Represents a book with title, summary, rating, etc.
- **Author**: Represents a book author with name, bio, etc.
- **Genre**: Represents a book category/genre

Each type has corresponding queries and mutations for CRUD operations.

## 📝 Example Queries

### Fetch All Books
```graphql
query {
  books {
    id
    title
    author {
      name
    }
    genres {
      name
    }
    rating
  }
}
```

### Get Book Details
```graphql
query {
  book(id: "book-id-here") {
    id
    title
    summary
    publishedDate
    author {
      name
      bio
    }
    genres {
      name
    }
  }
}
```

### Create a New Book
```graphql
mutation {
  createBook(input: {
    title: "New Book Title"
    summary: "This is a book summary"
    pages: 320
    publishedDate: "2023-04-09"
    authorId: "author-id-here"
    genreIds: ["genre-id-1", "genre-id-2"]
    rating: 4.5
    isAvailable: true
  }) {
    id
    title
  }
}
```

### Search Across Entities
```graphql
query {
  search(term: "fantasy") {
    __typename
    ... on Book {
      id
      title
    }
    ... on Author {
      id
      name
    }
    ... on Genre {
      id
      name
    }
  }
}
```

## 🏁 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   https://github.com/TusharAbhinav/graphql-server.git
   cd graphql-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Visit GraphQL Playground at `http://localhost:4000/graphql`

## 📈 Learning Path

This project is designed as a learning resource for understanding GraphQL. Follow these steps to understand the codebase:

1. Examine the `schema.js` file to understand the type definitions
2. Study the resolver functions in `resolvers.js` to see how data is fetched
3. Look at `mock-data.js` to understand the data structure
4. Try running the example queries in GraphQL Playground

## 🧪 Testing

You can test the API using:

- **GraphQL Playground**: Built-in browser interface
- **Postman**: Send GraphQL requests with the POST method
- **Automated tests**: Write Jest tests using the Apollo Server testing utilities

## 🔄 Extending the Project

To connect this project to a real database:

1. Install the required database drivers (e.g., `pg` for PostgreSQL)
2. Set up database models (using an ORM like Sequelize is recommended)
3. Update the resolvers to use database queries instead of in-memory data

## 🧠 Advanced Concepts

The project implements several advanced GraphQL concepts:

- **Custom scalars**: For handling dates
- **Input types**: For structured mutation arguments
- **Union types**: For search results across different entities
- **Interfaces**: For shared fields across types
- **Enum types**: For defining fixed value sets

## 📄 License

MIT
