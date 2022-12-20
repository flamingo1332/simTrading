import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ListPost from "../components/ListPost";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreatePost from "../components/CreatePost";
import Home from "../components/home/Home";
import { getCurrentUser } from "../auth/APIUtils";
import { ACCESS_TOKEN } from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OAuth2RedirectHandler from "../auth/oauth2/OAuth2RedirectHandler";
import Profile from "../auth/profile/Profile";
import Coin from "../components/coin/Coin";
import Coins from "../components/coin/Coins";
import Accounts from "../components/Accounts";
import Search from "../components/Search";
import axios from "axios";
import { API_BASE_URL } from "../constants";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
      .then((res) => {
        setCurrentUser(res);
        setAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAccount = () => {
    axios
      .delete(API_BASE_URL + `/api/user`, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem(ACCESS_TOKEN);
        setCurrentUser(null);
        setAuthenticated(false);
        toast(`Account ${currentUser.email} Deleted!`);
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data);
      });
  };
  //profile 페이지에서 로그아웃하면 에러발생
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setCurrentUser(null);
    setAuthenticated(false);
    toast("Safely logged out!");
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  return (
    <div>
      <Header handleLogout={handleLogout} authenticated={authenticated} currentUser={currentUser} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/coins/:id" element={<Coin authenticated={authenticated} currentUser={currentUser} />} />
          <Route path="/search/:query" element={<Search />} />

          <Route path="/posts" element={<ListPost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<CreatePost />} />
          <Route path="/delete-post/:id" element={<ListPost />} />

          <Route path="/Profile" element={<Profile currentUser={currentUser} deleteAccount={deleteAccount} />} />
          <Route path="/Accounts" element={<Accounts />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
