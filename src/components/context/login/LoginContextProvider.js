import { createContext, useEffect, useState } from "react";
import auth from "../../../services/firebase";

export const LoginContext = createContext({
  email: "",
  // password: "",
});

export const LoginProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  function test(x) {
    setCurrentUser(x.email);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(test);
    console.log("inside useEffect()");
    return unsubscribe;
  }, []);
  return (
    <LoginContext.Provider value={currentUser}>
      {children}
    </LoginContext.Provider>
  );
};
