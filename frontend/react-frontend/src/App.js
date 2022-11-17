import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListPostComponent from './components/ListPostComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreatePostComponent from './components/CreatePostComponent';
import HomeComponent from './components/home/HomeComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />

        <div className="container">

          <Routes>
            {/* element 안에 < > 형식으로 안하면 적용안됨 */}
            <Route path='/' element={<HomeComponent />} />
            <Route path='/posts' element={<ListPostComponent />} />
            <Route path='/create-post' element={<CreatePostComponent />} />
            <Route path='/edit-post/:id' element={<CreatePostComponent />} />
            <Route path='/delete-post/:id' element={<ListPostComponent />} />
          </Routes>

        </div>

        <FooterComponent />
      </Router >
    </div >
  );
}

export default App;
