import { createContext } from "react";

const BookContext = createContext({
  books: [],
  addBook: (book) => {},
  removeBook: (id) => {},
});
export default BookContext;
