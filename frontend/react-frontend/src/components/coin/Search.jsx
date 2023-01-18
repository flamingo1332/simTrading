import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { ACCESS_TOKEN } from "../../constants";
import { Link } from "react-router-dom";

const Search = () => {
  const { query } = useParams();
  const [data, setData] = useState(null);
  const headers = localStorage.getItem(ACCESS_TOKEN)
    ? { headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` } }
    : {};

  useEffect(() => {
    getSearchData();
    console.log(data);
  }, []);

  const getSearchData = () => {
    axios
      .get(API_BASE_URL + `/api/coins/search?query=${query}`, headers)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (data)
    return (
      <div className="container mt-3 mb-5">
        <h2 className="text-2xl mb-2">Search Results for "{query}"</h2>
        <div className="ibox-content forum-container">
          {data.coins.map((coin) => (
            <Link to={`/coins/${coin.id}`} key={coin.id} className="forum-item active">
              <div className="row">
                <div className="col-md-9">
                  <div className="forum-icon">
                    <img src={coin.thumb} width="18rem" height="18rem" alt="thumb"></img>
                  </div>
                  <div className="forum-item-title" style={{ color: "black", fontSize: "1rem" }}>
                    {coin.name} ({coin.symbol}){" "}
                  </div>
                </div>

                <span className="forum-sub-title text-muted" style={{ fontSize: "0.8rem" }}>
                  MarketCapRank: {coin.market_cap_rank}
                </span>
              </div>
              <hr />
            </Link>
          ))}
        </div>
      </div>
    );
};

export default Search;
