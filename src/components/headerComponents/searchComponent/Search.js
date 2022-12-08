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
          className="inputField"
          type="text"
          placeholder="search by author"
          value={inputValue}
          onChange={(ev) => setInputValue(ev.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
