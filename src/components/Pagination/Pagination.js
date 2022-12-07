import { useState } from "react";
import "./Pagination.css";
const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const [firstPages, setFirstPages] = useState(pageNumbers.slice(0, 3));
  const [lastPages, setLastPages] = useState(pageNumbers.slice(-3));

  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
      setFirstPages(pageNumbers.slice(currentPage, currentPage + 3));
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage >= 5) {
        setFirstPages(pageNumbers.slice(currentPage - 3, currentPage));
      } else {
        setFirstPages(pageNumbers.slice(0, 3));
      }
    }
  };
  return (
    <div className="pagination">
      <button className="paginationBtn" onClick={prevPage}>
        Previous
      </button>
      {pageNumbers.length > 6 ? (
        <>
          {firstPages.map((page) => (
            <button
              className={currentPage === page ? "activeBtn" : "paginationBtn"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button className="paginationBtn">...</button>
          {lastPages.map((page) => (
            <button
              className={currentPage === page ? "activeBtn" : "paginationBtn"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </>
      ) : (
        pageNumbers.map((pag) => (
          <button
            className={currentPage === pag ? "activeBtn" : "paginationBtn"}
            onClick={() => setCurrentPage(pag)}
          >
            {pag}
          </button>
        ))
      )}

      {/* {pageNumbers.map((pgNumber) => (
        <button
          className={currentPage === pgNumber ? "activeBtn" : "paginationBtn"}
          onClick={() => setCurrentPage(pgNumber)}
        >
          {pgNumber}
        </button>
      ))} */}
      <button className="paginationBtn" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
