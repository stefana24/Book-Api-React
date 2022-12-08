import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import fetchData from "../utils/fetchData";
import Pagination from "../Pagination/Pagination";
import styles from "./AuthorWork.module.css";
import BookContext from "../context/books/BookContext";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../services/firebase";

const AuthorInfo = () => {
  const [user, loading, error] = useAuthState(auth);
  const booksCtx = useContext(BookContext);
  const [entries, setEntries] = useState([]);
  const [size, setSize] = useState(0);
  const [authorInfo, setAuthorInfo] = useState([]);
  const params = useParams();
  const { id } = params;

  const [currentPage, setCurrentPage] = useState(1);
  const [worksPerPage, setWorksPerPage] = useState(10);

  const location = useLocation();

  const [isReady, setIsReady] = useState(false);

  const imgSrc = `https://covers.openlibrary.org/a/olid/${id}-M.jpg`;
  useEffect(() => {
    async function fetchAuthorWork() {
      const data = await fetchData(
        `https://openlibrary.org/authors/${id}/works.json`
      );
      console.log(data);
      setSize(data.size);
      // setEntries(data.entries);

      function fetchWorksOffset(offset) {
        return fetchData(
          `https://openlibrary.org/authors/${id}/works.json?offset=${offset}`
        );
      }

      const nr = Math.ceil(data.size / 50) - 1;
      console.log(nr);
      const promises = [];
      let offset = 50;
      for (let i = 0; i < nr; i++) {
        const promise = fetchWorksOffset(offset);
        promises.push(promise);
        offset += 50;
      }
      const promiseResponse = await Promise.all(promises);
      const allEntries = promiseResponse.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.entries);
      }, data.entries);

      setIsReady(true);
      setEntries(allEntries);
    }

    async function fetchAuthorInfo() {
      const data = await fetchData(
        `https://openlibrary.org/authors/${id}.json`
      );
      setAuthorInfo(data);
    }

    fetchAuthorWork();
    fetchAuthorInfo();
  }, [id]);
  const {
    name,
    birth_date = "",
    death_date = "",
    alternate_names = [],
    bio = {},
  } = authorInfo;

  const indexOfLastRecord = currentPage * worksPerPage;
  const indexOfFirstRecord = indexOfLastRecord - worksPerPage;
  const currentRecords = entries.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(entries.length / worksPerPage);

  const addBookHandler = ({ id, title, name, first_publish_date, covers }) => {
    const book = { id, title, name, first_publish_date, covers };
    if (user) {
      const found = storageArr.find((item) => item.id === book.id);
      if (!found) {
        alert("Book added");
        storageArr.push(book);
        localStorage.setItem("myBooks", JSON.stringify(storageArr));
      } else {
        alert("Book already added!!!!!");
      }
    } else {
      alert("Login to add book");
    }
  };

  const storageArr = JSON.parse(localStorage.getItem("myBooks")) || [];

  return (
    <>
      <div className={styles.resultsByAuthors}>
        <div className={styles.authorContainer}>
          <div className={styles.authorData}>
            <div className={styles.authorDataText}>
              <p>{name}</p>
              <p>
                <span>{birth_date && birth_date}</span>
                {death_date && <span>-{death_date}</span>}
              </p>

              {bio && <p className={styles.description}>{bio.value}</p>}
            </div>
            {size && <p className={styles.resultsFound}>{size} works</p>}
            {currentRecords.map((item) => {
              console.log(item);
              const { title, key, first_publish_date = "", covers = [] } = item;
              const imgSrc = `https://covers.openlibrary.org/b/id/${covers[0]}-M.jpg`;
              return (
                <div className={styles.work}>
                  <div className={styles.workInfo}>
                    {covers[0] && <img src={imgSrc}></img>}
                    <div className={styles.bookTitleAuthor}>
                      <p>{title}</p>
                      <p>By {name}</p>
                      {first_publish_date && (
                        <p>First published in {first_publish_date}</p>
                      )}
                    </div>
                  </div>
                  <button
                    className={styles.addToBookList}
                    onClick={() => {
                      addBookHandler({
                        id,
                        title,
                        name,
                        first_publish_date,
                        covers,
                      });
                    }}
                  >
                    Add to booklist
                  </button>
                </div>
              );
            })}
          </div>
          <div className={styles.authorInfo}>
            <div className={styles.authorImageContainer}>
              <img src={imgSrc} />
            </div>
            <div className={styles.alternativeNames}>
              {alternate_names && (
                <ul>
                  Alternative names:
                  {alternate_names.map((name) => (
                    <li>{name}</li>
                  ))}
                </ul>
              )}
            </div>
            <p>Subjects</p>
            {location.state.top_subjects.join(", ")}
          </div>
        </div>
      </div>
      {isReady && (
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default AuthorInfo;
