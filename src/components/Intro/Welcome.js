import library from "../../images/library.jpg";
import "./Welcome.css";
import auth from "../../services/firebase";
const Welcome = (props) => {
  const { user } = props;
  console.log(user);

  if (user) {
    return (
      <>
        <div className="welcomeUser">
          <h1>Welcome {user?.email}</h1>
          <button className="signOutBtn" onClick={() => auth.signOut()}>
            Sign out
          </button>
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
