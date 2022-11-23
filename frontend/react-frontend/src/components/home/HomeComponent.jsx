import React, { Component } from "react";
import PropTypes from "prop-types";
import "./HomeComponent.css";

const HomeComponent = () => {
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

HomeComponent.propTypes = {};

export default HomeComponent;
