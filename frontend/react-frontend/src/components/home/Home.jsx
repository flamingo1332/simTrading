import React from "react";
import "./Home.css";
import useAxios from "../../hooks/useAxios";
import Trending from "../coin/Trending";

const Home = () => {
  return (
    <div className="home-container">
      <Trending />
    </div>
  );
};

Home.propTypes = {};

export default Home;
