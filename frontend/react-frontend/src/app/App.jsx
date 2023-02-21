import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Home from "../components/home/Home";
import { ACCESS_TOKEN } from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OAuth2RedirectHandler from "../auth/oauth2/OAuth2RedirectHandler";
import Profile from "../auth/profile/Profile";
import Coin from "../components/coin/Coin";
import Coins from "../components/coin/Coins";
import Accounts from "../components/Accounts";
import Search from "../components/coin/Search";
import axios from "axios";
import { API_BASE_URL } from "../constants";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  const loadCurrentlyLoggedInUser = () => {
    axios
      .get(API_BASE_URL + `/api/user`, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .then((res) => {
        setCurrentUser(res.data);
        setAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Request failed with status code 401" && localStorage.getItem(ACCESS_TOKEN)) {
          handleLogout("AccessToken expired. Log in again!");
        }
      });
  };

  const deleteAccount = () => {
    axios
      .delete(API_BASE_URL + `/api/user/${currentUser.id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .then((res) => {
        handleLogout("Account Deleted!");
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data);
      });
  };

  const handleLogout = (msg) => {
    localStorage.removeItem(ACCESS_TOKEN);
    setCurrentUser(null);
    setAuthenticated(false);
    toast(msg);
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
