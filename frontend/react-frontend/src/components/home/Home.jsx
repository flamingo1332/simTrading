import React from "react";
import "./Home.css";
import Trending from "../coin/Trending";

const Home = () => {
  return (
    <div className="container mb-5 mt-3">
      <Trending />
    </div>
  );
};

Home.propTypes = {};

export default Home;
