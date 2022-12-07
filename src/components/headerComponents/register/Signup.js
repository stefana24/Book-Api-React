import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => navigate("/login"))
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
    <>
      <div className="formContainer">
        <form className="formAuthentication" onSubmit={handleSubmit}>
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
          <input type="text" placeholder="enter screen name" />
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
          <button type="submit">Sign up</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
