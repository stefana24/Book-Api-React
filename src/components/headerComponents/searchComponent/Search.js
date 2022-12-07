import { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
const Search = (props) => {
  const [inputValue, setInputValue] = useState("");
  const { authorSearch } = props;
  const navigate = useNavigate();
  function handleSubmit(ev) {
    ev.preventDefault();
    authorSearch(inputValue);
    navigate({
      pathname: "/authors",
      search: `?q=${inputValue}`,
    });
    setInputValue("");
  }
  return (
    <div className="searchComponent">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search"
          value={inputValue}
          onChange={(ev) => setInputValue(ev.target.value)}
        />
        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Search;
