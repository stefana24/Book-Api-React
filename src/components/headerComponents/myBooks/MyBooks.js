import { Link, useNavigate } from "react-router-dom";
import styles from "./MyBooks.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../services/firebase";
import { useContext, useEffect, useState } from "react";
// import BookContext from "../../context/books/BookContext";
import { db } from "../../../services/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
const MyBooks = () => {
  const [user, loading, error] = useAuthState(auth);
  // const storageArr = JSON.parse(localStorage.getItem("myBooks"));
  const navigate = useNavigate();
  // const booksCtx = useContext(BookContext);
  // console.log(booksCtx);

  const [books, setBooks] = useState([]);
  const booksCollectionRef = collection(db, "books");
  useEffect(() => {
    const getBookskeys = async () => {
      const currentUser = auth.currentUser.uid;
      const docSnap = doc(db, "users", currentUser);

      console.log("Document data:", docSnap.data().favorites);
    };
    const getBooks = async () => {
      const data = await getDocs(booksCollectionRef);
      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //console.log(data);
    };

    getBooks();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      navigate("/login");
    }
  }, [user, loading]);

  if (user) {
    if (books)
      return (
        <div className={styles.container}>
          <div className={styles["image-gallery"]}>
            {books.map((book) => {
              return (
                <div className={styles.bookItem}>
                  <p>{book.title}</p>
                  <p>By {book.name}</p>
                  {book.first_publish_date !== "" && (
                    <p>First published in: {book.first_publish_date}</p>
                  )}
                  {book.covers[0] && (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                      alt={book.title}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    else {
      return <p className={styles.notAdded}>No Books added yet</p>;
    }
  }
};

export default MyBooks;
