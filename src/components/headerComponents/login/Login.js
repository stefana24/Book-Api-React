import { useState } from "react";
import styles from "./Login.module.css";
import loginImg from "../../../images/pic3.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../../services/firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => navigate("/"))
      .catch((err) => console.error(err));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    signIn();
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={loginImg} alt="books" />
      </div>
      <div className={styles.formContainer}>
        <form className={styles.formContent} onSubmit={handleSubmit}>
          <h1 className={styles.loginMessage}>
            Log in to your account to view your saved books
          </h1>
          <input
            className={styles.inputField}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            className={styles.inputField}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type="submit" className={styles.loginSubmitBtn}>
            Login up
          </button>

          <div className={styles.divRegister}>
            <p>You don't have an account?</p>
            <h3>Register for free</h3>
            <Link to="/signup">
              <button>Sign up</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
