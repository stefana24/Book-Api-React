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
    getAuthorName(inputValue);
  };
  const [user, loading, error] = useAuthState(auth);

  const location = useLocation();
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(true);
  useEffect(() => {
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
        <div>
          <input
            id="menu-toggle"
            className={styles.inputBurg}
            type="checkbox"
          ></input>
          <label
            className={styles["menu-button-container"]}
            htmlFor="menu-toggle"
          >
            <div className={styles["menu-button"]}></div>
          </label>

          <ul className={styles.menu}>
            <li>
              <Search authorSearch={authorSearch} />
            </li>
            <li>
              <Link to="/myBooks">
                <button className={styles.myBooksBtn}>My books</button>
              </Link>
            </li>

            <li>
              {!user && showLogin && (
                <Link to="/login" className={styles.linkStyle}>
                  Login
                </Link>
              )}
            </li>
            <li>
              {!user && showSignup && (
                <Link to="/signup" className={styles.linkStyle}>
                  Signup
                </Link>
              )}
            </li>
            <li>
              {user && (
                <button
                  className={styles.signOutBtn}
                  onClick={() => auth.signOut()}
                >
                  Sign out
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
