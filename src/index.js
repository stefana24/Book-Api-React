import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/headerComponents/login/Login";
import Signup from "./components/headerComponents/register/Signup";
import AuthorInfo from "./components/author/AuthorWork";
import MyBooks from "./components/headerComponents/myBooks/MyBooks";
import BookProvider from "./components/context/books/BookProvider";
import { LoginProvider } from "./components/context/login/LoginContextProvider";
import FetchByAuthor from "./components/FoundAuthors/FetchByAuthor";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginProvider>
    <BookProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="authors" element={<FetchByAuthor />} />
            <Route path="myBooks" element={<MyBooks />} />
            <Route path="work/:id" element={<AuthorInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookProvider>
  </LoginProvider>
);
