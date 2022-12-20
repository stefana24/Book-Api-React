import Header from "./components/headerComponents/header/Header";
import { useEffect, useState } from "react";
import Welcome from "./components/Intro/Welcome";
import Footer from "./components/footer/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./services/firebase";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
function App() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  function getAuthorName(inputValue) {
    setName(inputValue);
  }
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
    if (location.pathname !== "/") {
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }
  }, [location]);
  return (
    <div className="app">
      <Header getAuthorName={getAuthorName} />
      {showWelcome && <Welcome user={user} />}
      {showWelcome && <Footer />}
      <Outlet />
    </div>
  );
}

export default App;
