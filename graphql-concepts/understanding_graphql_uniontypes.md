# Understanding GraphQL Union Types

## What Are Union Types?

A union type in GraphQL represents an object that could be one of several possible object types. Unlike interfaces, unions don't define any common fields between the types.

The key characteristics of union types:
- They allow a field to return different object types
- The possible types need to be explicitly specified in the schema
- When querying a union, you need to use fragments to specify what fields to retrieve for each possible type

## Union Types in Schema Definition

Here's how union types are defined in a GraphQL schema:

```graphql
# Define individual object types
type Book {
  id: ID!
  title: String!
  summary: String
}

type Author {
  id: ID!
  name: String!
  bio: String
}

type Genre {
  id: ID!
  name: String!
  description: String
}

# Define a union type
union SearchResult = Book | Author | Genre

# Query that returns this union type
type Query {
  search(term: String!): [SearchResult!]!
}
```

## Resolving Union Types

For union types to work, GraphQL needs to know how to determine which concrete type each result is. This is done with a special resolver called `__resolveType`:

```javascript
const resolvers = {
  SearchResult: {
    __resolveType(obj) {
      if (obj.title) return 'Book';
      if (obj.bio) return 'Author';
      if (obj.description) return 'Genre';
      return null;
    },
  },
  
  Query: {
    search: (_, { term }) => {
      // Search across books, authors, and genres
      const bookResults = books.filter(book => 
        book.title.toLowerCase().includes(term.toLowerCase())
      );
      
      const authorResults = authors.filter(author => 
        author.name.toLowerCase().includes(term.toLowerCase())
      );
      
      const genreResults = genres.filter(genre => 
        genre.name.toLowerCase().includes(term.toLowerCase())
      );
      
      // Return a mixed array of results
      return [...bookResults, ...authorResults, ...genreResults];
    }
  }
};
```

The `__resolveType` resolver examines the object's properties to determine its type:
- If it has a `title` property, it's a `Book`
- If it has a `bio` property, it's an `Author`
- If it has a `description` property, it's a `Genre`

## Querying Union Types

When querying a union type, you must use inline fragments to specify which fields to retrieve for each possible type:

```graphql
query {
  search(term: "fantasy") {
    __typename  # Returns the concrete type name (Book, Author, or Genre)
    ... on Book {
      id
      title
      summary
    }
    ... on Author {
      id
      name
      bio
    }
    ... on Genre {
      id
      name
      description
    }
  }
}
```

The `__typename` field is a special field that returns the name of the concrete type.

## Example Response

A query to the search field might return:

```json
{
  "data": {
    "search": [
      {
        "__typename": "Book",
        "id": "book1",
        "title": "Fantasy World",
        "summary": "An epic fantasy adventure"
      },
      {
        "__typename": "Author",
        "id": "author1",
        "name": "J.R.R. Tolkien",
        "bio": "Known for fantasy literature"
      },
      {
        "__typename": "Genre",
        "id": "genre1",
        "name": "Fantasy",
        "description": "Fiction with magical elements"
      }
    ]
  }
}
```

## Practical Use Cases for Union Types

Union types are particularly useful for:

1. **Search functionality**: Return results across different entity types
2. **Activity feeds**: Mix different types of activities in a single feed
3. **Recommendations**: Surface various types of recommended content
4. **Error handling**: Return either a success result or different error types

## Processing Union Types on the Client

When working with union types on the client side, you typically need to handle each type differently:

```javascript
// Example client-side code for processing search results
function renderSearchResults(results) {
  return results.map(result => {
    switch(result.__typename) {
      case 'Book':
        return <BookCard title={result.title} summary={result.summary} />;
      case 'Author':
        return <AuthorCard name={result.name} bio={result.bio} />;
      case 'Genre':
        return <GenreCard name={result.name} description={result.description} />;
      default:
        return <UnknownResultCard />;
    }
  });
}
```

## Differences Between Unions and Interfaces

Both unions and interfaces allow fields to return multiple types, but they have key differences:

- **Unions**: No shared fields between types. Use when types are fundamentally different entities.
- **Interfaces**: Define common fields that implementing types must include. Use when types share a common structure.

## Benefits of Union Types

Union types provide:

1. **Flexibility**: Allow a single field to return different object types
2. **Unified Interfaces**: Create powerful aggregations like search or feeds
3. **Type Safety**: The client knows exactly what types to expect
4. **Clean API Design**: Group related but structurally different entities

## Considerations and Best Practices

- Use meaningful property differences to distinguish between types in `__resolveType`
- Consider using interfaces instead if your types share a significant number of common fields
- Include `__typename` in your queries to make client-side type checking easier
- Keep the number of types in a union reasonable for maintainability

## Conclusion

Union types in GraphQL provide a powerful way to create flexible APIs that can return heterogeneous data types from a single field. They're particularly valuable for features like search, feeds, and recommendations where different entity types need to be combined in a single result set.