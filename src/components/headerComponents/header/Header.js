import Search from "../searchComponent/Search";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../services/firebase";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
const Header = (props) => {
  const { getAuthorName } = props;
  const authorSearch = (inputValue) => {
    console.log(inputValue);
    getAuthorName(inputValue);
  };
  const [user, loading, error] = useAuthState(auth);

  const location = useLocation();
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(true);
  useEffect(() => {
    console.log(location);
    if (location.pathname === "/login") {
      setShowLogin(false);
      return;
    }
    if (location.pathname === "/signup") {
      setShowSignup(false);
      return;
    }
    setShowLogin(true);
    setShowSignup(true);
  }, [location]);

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.linkStyle}>
          <h2>Open Library</h2>
          <div className={styles.outline}></div>
        </Link>
        <Search authorSearch={authorSearch} />
        <Link to="/myBooks">
          <button className={styles.myBooksBtn}>My books</button>
        </Link>

        <div className={"authentication"}>
          {!user && showLogin && (
            <Link to="/login" className={styles.linkStyle}>
              Login
            </Link>
          )}
          {!user && showSignup && (
            <Link to="/signup" className={styles.linkStyle}>
              Signup
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
