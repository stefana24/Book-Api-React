import { useEffect, useState } from "react";
import AuthorItem from "./AuthorItem";
import fetchData from "../utils/fetchData";
import Pagination from "../Pagination/Pagination";
import "./Authors.css";
import { useSearchParams } from "react-router-dom";
const FetchByAuthor = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [authors, setAuthors] = useState([]);
  const [total, setTotal] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const authorName = searchParams.get("q");

  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(10);

  useEffect(() => {
    async function fetchAuthors() {
      const data = await fetchData(
        `https://openlibrary.org/search/authors.json?q=${authorName}`
      );

      function fetchAuthorsOffset(offset) {
        return fetchData(
          `https://openlibrary.org/search/authors.json?q=${authorName}&offset=${offset}`
        );
      }
      const nr = Math.ceil(data.numFound / data.docs.length) - 1;
      const promises = [];
      let offset = 100;
      for (let i = 0; i < nr; i++) {
        const promise = fetchAuthorsOffset(offset);
        promises.push(promise);
        offset += 100;
      }
      const promiseResponse = await Promise.all(promises);
      const allAuthors = promiseResponse.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.docs);
      }, data.docs);

      setIsReady(true);
      setTotal(data.numFound);
      setAuthors(allAuthors);
    }

    if (authorName) fetchAuthors();
  }, [authorName]);

  const indexOfLastRecord = currentPage * authorsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - authorsPerPage;
  const currentRecords = authors.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(authors.length / authorsPerPage);

  return (
    <div className="resultsByAuthors">
      {isReady && <h3 className="resultsFound">{total} results found</h3>}
      {currentRecords.map((element) => {
        return (
          <>
            <AuthorItem
              id={element.key}
              name={element.name}
              birth_date={element.birth_date}
              death_date={element.death_date}
              top_work={element.top_work}
              work_count={element.work_count}
              top_subjects={element.top_subjects}
            />
          </>
        );
      })}
      {isReady && (
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default FetchByAuthor;
