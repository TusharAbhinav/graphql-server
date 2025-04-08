// resolvers.js
const { books, authors, genres } = require('./mock-data');
const { v4: uuidv4 } = require('uuid');



// Helper functions for data access
const findBookById = (id) => books.find(book => book.id === id);
const findAuthorById = (id) => authors.find(author => author.id === id);
const findGenreById = (id) => genres.find(genre => genre.id === id);
const findBooksByAuthorId = (authorId) => books.filter(book => book.authorId === authorId);
const findBooksByGenreId = (genreId) => books.filter(book => book.genreIds.includes(genreId));

const resolvers = {
  // Type resolvers
  Book: {
    // Resolve the author field on Book type
    author: (parent) => {
      return findAuthorById(parent.authorId);
    },
    // Resolve the genres field on Book type
    genres: (parent) => {
      return parent.genreIds.map(genreId => findGenreById(genreId));
    }
  },
  
  Author: {
    // Resolve the books field on Author type
    books: (parent) => {
        console.log('Resolving books for author:', parent.name);
      return findBooksByAuthorId(parent.id);
    }
  },
  
  Genre: {
    // Resolve the books field on Genre type
    books: (parent) => {
      return findBooksByGenreId(parent.id);
    }
  },
  
  // Define how the union type SearchResult is resolved
  SearchResult: {
    __resolveType(obj) {
      if (obj.title) return 'Book';
      if (obj.bio) return 'Author';
      if (obj.description) return 'Genre';
      return null;
    },
  },
  
  // Query resolvers
  Query: {
    // Get a single book by ID
    book: (_, { id }) => {
      return findBookById(id);
    },
    
    // Get all books with optional filtering and sorting
    books: (_, { limit = 10, offset = 0, sortBy = 'title', direction = 'ASC' }) => {
      // Sort books
      const sortedBooks = [...books].sort((a, b) => {
        if (direction === 'ASC') {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
      
      // Apply pagination
      return sortedBooks.slice(offset, offset + limit);
    },
    
    // Get books by author ID
    booksByAuthor: (_, { authorId }) => {
      return findBooksByAuthorId(authorId);
    },
    
    // Get a single author by ID
    author: (_, { id }) => {
      return findAuthorById(id);
    },
    
    // Get all authors
    authors: () => {
      return authors;
    },
    
    // Get a single genre by ID
    genre: (_, { id }) => {
      return findGenreById(id);
    },
    
    // Get all genres
    genres: () => {
      return genres;
    },
    
    // Search across books, authors, and genres
    search: (_, { term }) => {
      const lowercaseTerm = term.toLowerCase();
      
      // Search in books
      const bookResults = books.filter(book => 
        book.title.toLowerCase().includes(lowercaseTerm) || 
        (book.summary && book.summary.toLowerCase().includes(lowercaseTerm))
      );
      
      // Search in authors
      const authorResults = authors.filter(author => 
        author.name.toLowerCase().includes(lowercaseTerm) || 
        (author.bio && author.bio.toLowerCase().includes(lowercaseTerm))
      );
      
      // Search in genres
      const genreResults = genres.filter(genre => 
        genre.name.toLowerCase().includes(lowercaseTerm) || 
        (genre.description && genre.description.toLowerCase().includes(lowercaseTerm))
      );
      
      // Combine results
      return [...bookResults, ...authorResults, ...genreResults];
    }
  },
  
  // Mutation resolvers
  Mutation: {
    // Create a new book
    createBook: (_, { input }) => {
      const newBook = {
        id: uuidv4(),
        ...input,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      books.push(newBook);
      
      // Publish subscription event
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
      
      return newBook;
    },
    
    // Update an existing book
    updateBook: (_, { id, input }) => {
      const bookIndex = books.findIndex(book => book.id === id);
      
      if (bookIndex === -1) {
        throw new Error(`Book with ID ${id} not found`);
      }
      
      // Update book
      const updatedBook = {
        ...books[bookIndex],
        ...input,
        updatedAt: new Date()
      };
      
      books[bookIndex] = updatedBook;
      
      // Publish subscription event
      pubsub.publish('BOOK_UPDATED', { bookUpdated: updatedBook });
      
      return updatedBook;
    },
    
    // Delete a book
    deleteBook: (_, { id }) => {
      const bookIndex = books.findIndex(book => book.id === id);
      
      if (bookIndex === -1) {
        throw new Error(`Book with ID ${id} not found`);
      }
      
      // Remove book
      books.splice(bookIndex, 1);
      
      // Publish subscription event
      pubsub.publish('BOOK_DELETED', { bookDeleted: id });
      
      return true;
    },
    
    // Create a new author
    createAuthor: (_, { input }) => {
      const newAuthor = {
        id: uuidv4(),
        ...input,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      authors.push(newAuthor);
      
      return newAuthor;
    },
    
    // Update an existing author
    updateAuthor: (_, { id, input }) => {
      const authorIndex = authors.findIndex(author => author.id === id);
      
      if (authorIndex === -1) {
        throw new Error(`Author with ID ${id} not found`);
      }
      
      // Update author
      const updatedAuthor = {
        ...authors[authorIndex],
        ...input,
        updatedAt: new Date()
      };
      
      authors[authorIndex] = updatedAuthor;
      
      return updatedAuthor;
    },
    
    // Delete an author
    deleteAuthor: (_, { id }) => {
      const authorIndex = authors.findIndex(author => author.id === id);
      
      if (authorIndex === -1) {
        throw new Error(`Author with ID ${id} not found`);
      }
      
      // Check if author has books
      const authorBooks = findBooksByAuthorId(id);
      if (authorBooks.length > 0) {
        throw new Error(`Cannot delete author with ID ${id} because they have associated books`);
      }
      
      // Remove author
      authors.splice(authorIndex, 1);
      
      return true;
    }
  },
  
};

module.exports = { resolvers };