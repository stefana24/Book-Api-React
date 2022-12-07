import { Link, useNavigate } from "react-router-dom";
import styles from "./MyBooks.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../services/firebase";
import { useEffect } from "react";
const MyBooks = () => {
  const [user, loading, error] = useAuthState(auth);
  const storageArr = JSON.parse(localStorage.getItem("myBooks"));
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      navigate("/login");
    }
  }, [user, loading]);

  if (user) {
    if (storageArr)
      return (
        <div className={styles.container}>
          <div className={styles["image-gallery"]}>
            {storageArr.map((book) => {
              return (
                <div className={styles.bookItem}>
                  <p>{book.title}</p>
                  <p>By {book.name}</p>
                  {book.first_publish_date && (
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
    return <p className={styles.notAdded}>No Books added yet</p>;
  }
};

export default MyBooks;
