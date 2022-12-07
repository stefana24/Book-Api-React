import { useState } from "react";
import "./Login.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../../services/firebase";
import { useNavigate } from "react-router-dom";

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
    <>
      <div className="formContainer">
        <form className={`formAuthentication`} onSubmit={handleSubmit}>
          <h1 className="loginMessage">Log in</h1>
          <label>Email</label>
          <input
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type="submit" className="loginSubmitBtn">
            Login up
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
