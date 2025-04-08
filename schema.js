const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Scalar types come built-in (String, Int, Float, Boolean, ID)
  # You can define custom scalar types too
  scalar Date

  # Object types represent entity structures
  type Book {
    id: ID!                # The ! means non-nullable
    title: String!
    summary: String
    pages: Int
    publishedDate: Date
    author: Author!        # Reference to another type
    genres: [Genre!]       # Array of non-nullable Genre objects
    rating: Float
    isAvailable: Boolean
  }

  type Author {
    id: ID!
    name: String!
    bio: String
    books: [Book!]         # Relationship back to books
  }

  type Genre {
    id: ID!
    name: String!
    description: String
    books: [Book!]
  }

  # Input types are used for arguments to mutations
  input BookInput {
    title: String!
    summary: String
    pages: Int
    publishedDate: String  # Dates often passed as strings and parsed
    authorId: ID!
    genreIds: [ID!]
    rating: Float
    isAvailable: Boolean
  }

  input AuthorInput {
    name: String!
    bio: String
  }

  # Enums define a fixed set of allowed values
  enum SortDirection {
    ASC
    DESC
  }

  # Interface defines a contract that types can implement
  interface Entity {
    id: ID!
    createdAt: Date
    updatedAt: Date
  }

  # Union types can return multiple types
  union SearchResult = Book | Author | Genre

  # Queries (read operations)
  type Query {
    # Book queries
    book(id: ID!): Book
    books(
      limit: Int = 10
      offset: Int = 0
      sortBy: String = "title"
      direction: SortDirection = ASC
    ): [Book!]!
    booksByAuthor(authorId: ID!): [Book!]!
    
    # Author queries
    author(id: ID!): Author
    authors: [Author!]!
    
    # Genre queries
    genre(id: ID!): Genre
    genres: [Genre!]!
    
    # Search across multiple types
    search(term: String!): [SearchResult!]!
  }

  # Mutations (write operations)
  type Mutation {
    # Book mutations
    createBook(input: BookInput!): Book!
    updateBook(id: ID!, input: BookInput!): Book!
    deleteBook(id: ID!): Boolean!
    
    # Author mutations
    createAuthor(input: AuthorInput!): Author!
    updateAuthor(id: ID!, input: AuthorInput!): Author!
    deleteAuthor(id: ID!): Boolean!
  }

  # Subscriptions (real-time operations)
  type Subscription {
    bookAdded: Book!
    bookUpdated: Book!
    bookDeleted: ID!
  }
`;

module.exports = { typeDefs };