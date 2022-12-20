import library from "../../images/library.jpg";
import "./Welcome.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user/userContext";
import { db } from "../../services/firebase";
import auth from "../../services/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
const Welcome = (props) => {
  const { user } = props;
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        const currentUser = auth.currentUser.uid;
        const docRef = doc(db, "users", currentUser);
        const data = await getDoc(docRef);
        setUsername(data.data().screenName || "");
      };
      getUser();
    }

    //TToyS5rr3rOrYvQD1eDmHFHW1VU2
  }, []);

  if (user) {
    return (
      <>
        <div className="welcomeUser">
          <h1>Welcome {username}</h1>
        </div>
        <div className="welcomeImage">
          <img src={library}></img>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="welcomeText">
        <p>Welcome to open library</p>
        <p>A place where you can look for authors and their books</p>
      </div>

      <div className="welcomeImage">
        <img src={library}></img>
      </div>
    </>
  );
};
export default Welcome;
