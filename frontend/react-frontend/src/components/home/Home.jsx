import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Home.css";

const Home = (props) => {
  return (
    <div className="home-container">
      <div className="container">
        <div className="graf-bg-container">
          <div className="graf-layout">
            <div className="graf-circle"></div>
            <div className="graf-circle"></div>
            <div className="graf-circle"></div>
            <div className="graf-circle"></div>
            <div className="graf-circle"></div>
            <div className="graf-circle"></div>
            <div className="graf-circle"></div>
            <div className="graf-circle"></div>
            <div className="graf-circle"></div>
            <div className="graf-circle"></div>
            <div className="graf-circle"></div>
          </div>
        </div>
        <h1 className="home-title">SimTrading</h1>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
