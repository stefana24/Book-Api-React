import { useReducer, useRef } from "react";
import BookContext from "./BookContext";

const initialState = {
  books: [],
};

const booksReducer = (state, action) => {
  if (action.type === "add") {
    const updated = state.books.concat(action.payload);
    return { books: updated };
  }
  return state;
};

const BookProvider = ({ children }) => {
  const [booksState, dispatchBooks] = useReducer(booksReducer, initialState);

  const addBookHandler = (book) => {
    dispatchBooks({ type: "add", payload: book });
  };

  const bookCtx = {
    books: booksState.books,
    addBook: addBookHandler,
  };

  return (
    <BookContext.Provider value={bookCtx}>{children}</BookContext.Provider>
  );
};

export default BookProvider;
