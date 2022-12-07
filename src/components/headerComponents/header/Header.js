import Search from "../searchComponent/Search";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../services/firebase";
const Header = (props) => {
  const { getAuthorName } = props;
  const authorSearch = (inputValue) => {
    console.log(inputValue);
    getAuthorName(inputValue);
  };
  const [user, loading, error] = useAuthState(auth);
  return (
    <header>
      <Link to="/" className="linkStyle">
        <h2>Open Library</h2>
        <div className="outline"></div>
      </Link>
      <Search authorSearch={authorSearch} />
      {/* <Link to="/login" className="linkStyle">
        My books
      </Link> */}
      <Link to="/myBooks">
        <button className="linkStyle myBooksBtn">My books</button>
      </Link>

      <div className={"authentication"}>
        {!user && (
          <Link to="/login" className="linkStyle">
            Login
          </Link>
        )}
        {!user && (
          <Link to="/signup" className="linkStyle">
            {" "}
            Signup
          </Link>
        )}
      </div>
    </header>
  );
};
export default Header;
