import { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth, { db } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import registerImage from "../../../images/typing.jpg";
import UserContext from "../../context/user/userContext";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        setDoc(doc(db, "users", auth.user.uid), {
          screenName: username,
        });
      })
      .then(() => navigate("/login"))
      .catch((err) => console.error(err));
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (password !== passwordConfirm) {
      alert("Password does not match");
      return;
    }
    register();
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={registerImage}></img>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label>Your email address</label>
          <input
            type="text"
            placeholder="enter your email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <label>
            Choose a screen name. Screen names are public and cannot be changed
            later
          </label>
          <input
            type="text"
            placeholder="enter screen name"
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <label>Choose a password</label>
          <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <label>Confirm password</label>
          <input
            type="password"
            placeholder="confirm your password"
            value={passwordConfirm}
            onChange={(ev) => setPasswordConfirm(ev.target.value)}
          />
          <button type="submit" className={styles.submitBtn}>
            Sign up
          </button>
          <div className={styles.signIn}>
            <p>Already have an account?</p>
            <button onClick={() => navigate("/login")}>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
