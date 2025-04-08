// mock-data.js - Comprehensive dummy data for GraphQL schema
const { v4: uuidv4 } = require('uuid');

// Generate IDs
const authorIds = Array(5).fill().map(() => uuidv4());
const genreIds = Array(8).fill().map(() => uuidv4());
const bookIds = Array(15).fill().map(() => uuidv4());
console.log("Author IDs:", authorIds);
console.log("Genre IDs:", genreIds);
console.log("Book IDs:", bookIds);
// Authors data
const authors = [
  {
    id: authorIds[0],
    name: "Jane Austen",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05")
  },
  {
    id: authorIds[1],
    name: "George Orwell",
    bio: "English novelist, essayist, and critic. His work is characterized by lucid prose and social criticism.",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-02-15")
  },
  {
    id: authorIds[2],
    name: "J.K. Rowling",
    bio: "British author and philanthropist best known for writing the Harry Potter fantasy series.",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15")
  },
  {
    id: authorIds[3],
    name: "Haruki Murakami",
    bio: "Japanese writer known for works of fiction, surrealism and magical realism.",
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-03-10")
  },
  {
    id: authorIds[4],
    name: "Toni Morrison",
    bio: "American novelist, essayist, and professor who won the Nobel Prize for Literature in 1993.",
    createdAt: new Date("2023-01-25"),
    updatedAt: new Date("2023-01-25")
  }
];

// Genres data
const genres = [
  {
    id: genreIds[0],
    name: "Fiction",
    description: "Literature created from the imagination, not presented as fact.",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: genreIds[1],
    name: "Science Fiction",
    description: "Fiction dealing with imaginative concepts such as futuristic settings and technology.",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02")
  },
  {
    id: genreIds[2],
    name: "Fantasy",
    description: "Fiction with elements of magic, mythical creatures, or supernatural phenomena.",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-02-05")
  },
  {
    id: genreIds[3],
    name: "Mystery",
    description: "Fiction dealing with the solution of a crime or puzzle.",
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04")
  },
  {
    id: genreIds[4],
    name: "Romance",
    description: "Fiction focusing on the romantic relationship between characters.",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-03-15")
  },
  {
    id: genreIds[5],
    name: "Historical Fiction",
    description: "Fiction set in the past that incorporates historical events or people.",
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06")
  },
  {
    id: genreIds[6],
    name: "Dystopian",
    description: "Fiction set in a dark, often post-apocalyptic future society.",
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07")
  },
  {
    id: genreIds[7],
    name: "Non-fiction",
    description: "Literature based on facts and real events.",
    createdAt: new Date("2023-01-08"),
    updatedAt: new Date("2023-02-20")
  }
];

// Books data
const books = [
  {
    id: bookIds[0],
    title: "Pride and Prejudice",
    summary: "A romantic novel of manners that follows the character development of Elizabeth Bennet.",
    pages: 432,
    publishedDate: new Date("1813-01-28"),
    authorId: authorIds[0],
    genreIds: [genreIds[0], genreIds[4], genreIds[5]],
    rating: 4.7,
    isAvailable: true,
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05")
  },
  {
    id: bookIds[1],
    title: "Sense and Sensibility",
    summary: "The story of the Dashwood sisters as they come of age.",
    pages: 384,
    publishedDate: new Date("1811-10-30"),
    authorId: authorIds[0],
    genreIds: [genreIds[0], genreIds[4], genreIds[5]],
    rating: 4.5,
    isAvailable: true,
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-02-10")
  },
  {
    id: bookIds[2],
    title: "1984",
    summary: "A dystopian social science fiction novel set in an imagined future.",
    pages: 328,
    publishedDate: new Date("1949-06-08"),
    authorId: authorIds[1],
    genreIds: [genreIds[0], genreIds[6], genreIds[1]],
    rating: 4.8,
    isAvailable: true,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10")
  },
  {
    id: bookIds[3],
    title: "Animal Farm",
    summary: "An allegorical novella reflecting events leading up to the Russian Revolution.",
    pages: 112,
    publishedDate: new Date("1945-08-17"),
    authorId: authorIds[1],
    genreIds: [genreIds[0], genreIds[6]],
    rating: 4.6,
    isAvailable: true,
    createdAt: new Date("2023-01-11"),
    updatedAt: new Date("2023-03-05")
  },
  {
    id: bookIds[4],
    title: "Harry Potter and the Philosopher's Stone",
    summary: "The first novel in the Harry Potter series, featuring a young wizard's adventures at Hogwarts.",
    pages: 223,
    publishedDate: new Date("1997-06-26"),
    authorId: authorIds[2],
    genreIds: [genreIds[0], genreIds[2]],
    rating: 4.9,
    isAvailable: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15")
  },
  {
    id: bookIds[5],
    title: "Harry Potter and the Chamber of Secrets",
    summary: "The second novel in the Harry Potter series.",
    pages: 251,
    publishedDate: new Date("1998-07-02"),
    authorId: authorIds[2],
    genreIds: [genreIds[0], genreIds[2]],
    rating: 4.8,
    isAvailable: true,
    createdAt: new Date("2023-01-16"),
    updatedAt: new Date("2023-02-20")
  },
  {
    id: bookIds[6],
    title: "Harry Potter and the Prisoner of Azkaban",
    summary: "The third novel in the Harry Potter series.",
    pages: 317,
    publishedDate: new Date("1999-07-08"),
    authorId: authorIds[2],
    genreIds: [genreIds[0], genreIds[2]],
    rating: 4.9,
    isAvailable: true,
    createdAt: new Date("2023-01-17"),
    updatedAt: new Date("2023-01-17")
  },
  {
    id: bookIds[7],
    title: "Norwegian Wood",
    summary: "A nostalgic story of loss and sexuality set in Tokyo during the late 1960s.",
    pages: 296,
    publishedDate: new Date("1987-09-04"),
    authorId: authorIds[3],
    genreIds: [genreIds[0]],
    rating: 4.2,
    isAvailable: true,
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-01-20")
  },
  {
    id: bookIds[8],
    title: "Kafka on the Shore",
    summary: "A novel powered by two remarkable characters: a teenage boy and an aging simpleton.",
    pages: 505,
    publishedDate: new Date("2002-09-12"),
    authorId: authorIds[3],
    genreIds: [genreIds[0], genreIds[2]],
    rating: 4.3,
    isAvailable: true,
    createdAt: new Date("2023-01-21"),
    updatedAt: new Date("2023-03-15")
  },
  {
    id: bookIds[9],
    title: "1Q84",
    summary: "A work of speculative fiction about a woman who finds herself in an alternate world.",
    pages: 925,
    publishedDate: new Date("2009-05-29"),
    authorId: authorIds[3],
    genreIds: [genreIds[0], genreIds[1], genreIds[2]],
    rating: 4.1,
    isAvailable: true,
    createdAt: new Date("2023-01-22"),
    updatedAt: new Date("2023-01-22")
  },
  {
    id: bookIds[10],
    title: "Beloved",
    summary: "A novel inspired by the life of Margaret Garner, an African American who escaped slavery.",
    pages: 324,
    publishedDate: new Date("1987-09-02"),
    authorId: authorIds[4],
    genreIds: [genreIds[0], genreIds[5]],
    rating: 4.4,
    isAvailable: true,
    createdAt: new Date("2023-01-25"),
    updatedAt: new Date("2023-02-28")
  },
  {
    id: bookIds[11],
    title: "Song of Solomon",
    summary: "A novel about a young African-American man's search for identity.",
    pages: 337,
    publishedDate: new Date("1977-09-02"),
    authorId: authorIds[4],
    genreIds: [genreIds[0], genreIds[5]],
    rating: 4.3,
    isAvailable: true,
    createdAt: new Date("2023-01-26"),
    updatedAt: new Date("2023-01-26")
  },
  {
    id: bookIds[12],
    title: "The Bluest Eye",
    summary: "A novel about a young African-American girl who wishes for blue eyes.",
    pages: 224,
    publishedDate: new Date("1970-10-12"),
    authorId: authorIds[4],
    genreIds: [genreIds[0]],
    rating: 4.2,
    isAvailable: true,
    createdAt: new Date("2023-01-27"),
    updatedAt: new Date("2023-03-20")
  },
  {
    id: bookIds[13],
    title: "Emma",
    summary: "A novel about youthful hubris and romantic misunderstandings.",
    pages: 474,
    publishedDate: new Date("1815-12-23"),
    authorId: authorIds[0],
    genreIds: [genreIds[0], genreIds[4], genreIds[5]],
    rating: 4.4,
    isAvailable: true,
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07")
  },
  {
    id: bookIds[14],
    title: "Homage to Catalonia",
    summary: "An account of Orwell's experiences in the Spanish Civil War.",
    pages: 232,
    publishedDate: new Date("1938-04-25"),
    authorId: authorIds[1],
    genreIds: [genreIds[7]],
    rating: 4.3,
    isAvailable: false,
    createdAt: new Date("2023-01-12"),
    updatedAt: new Date("2023-02-25")
  }
];

module.exports = {
  authors,
  genres,
  books,
  authorIds,
  genreIds,
  bookIds
};