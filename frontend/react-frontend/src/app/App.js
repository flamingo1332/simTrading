import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListPost from '../components/ListPost';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreatePost from '../components/CreatePost';
import Home from '../components/home/Home';
import Login from '../auth/login/Login';
import SignUp from '../auth/signup/SignUp';
import { getCurrentUser } from '../auth/APIUtils'
import { ACCESS_TOKEN } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OAuth2RedirectHandler from '../auth/oauth2/OAuth2RedirectHandler';
import Profile from '../auth/profile/Profile';
import { useNavigate } from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, [])


  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
      .then(res => {
        setCurrentUser(res)
        setAuthenticated(true);
      }).catch(error => {
        console.log(error);
      });
  }

  //profile 페이지에서 로그아웃하면 에러발생
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setCurrentUser(null);
    setAuthenticated(false);
    toast.success("Safely logged out!")

      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div>


      <Header handleLogout={handleLogout} authenticated={authenticated} currentUser={currentUser} />
      <div className="container">

        <Routes>
          {/* element 안에 < > 형식으로 안하면 적용안됨 */}
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<ListPost />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/edit-post/:id' element={<CreatePost />} />
          <Route path='/delete-post/:id' element={<ListPost />} />


          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/Profile' element={<Profile currentUser={currentUser} />} />
          <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler />} />

        </Routes>

      </div>

      <Footer />

    </div >
  );
}

export default App;
