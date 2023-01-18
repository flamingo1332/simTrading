import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import { ACCESS_TOKEN } from "../../constants";
import { useEffect } from "react";
import "./Coins.css";
import { Link } from "react-router-dom";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState(1);
  const headers = localStorage.getItem(ACCESS_TOKEN)
    ? { headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` } }
    : {};

  useEffect(() => {
    getCoins();
  }, [page]);

  const getCoins = () => {
    axios
      .get(API_BASE_URL + `/api/coins/markets?id=&per_page=100&page=${page}`, headers)
      .then((res) => {
        setCoins(res.data);
        console.log(coins);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePage = () => {
    setPage(input);
  };

  if (coins) {
    return (
      <div className="container mt-3">
        <div className="ibox-content forum-container">
          {coins.map((coin) => (
            <Link to={`/coins/${coin.id}`} key={coin.id} className="forum-item active">
              <div className="row">
                <div className="col-md-9">
                  <div className="forum-icon">
                    <img src={coin.image} width="40rem" height="40rem"></img>
                  </div>
                  <div className="forum-item-title" style={{ color: "black", fontSize: "1.2rem" }}>
                    {coin.id}
                  </div>
                  <div className="forum-sub-title text-muted">
                    Market Cap Rank: {coin.market_cap_rank} &nbsp;&nbsp; Market Cap: ${coin.market_cap} &nbsp;&nbsp;
                    Price: ${coin.current_price}
                  </div>
                </div>
                <div className="col-md-1 forum-info mr-3">
                  {coin.price_change_percentage_24h >= 0 ? (
                    <span className="text-success views-number">{coin.price_change_percentage_24h}%</span>
                  ) : (
                    <span className="text-danger views-number">{coin.price_change_percentage_24h}%</span>
                  )}
                  <div>
                    <small>price(24h)%</small>
                  </div>
                </div>

                <div className="col-md-1 forum-info">
                  {coin.market_cap_change_percentage_24h >= 0 ? (
                    <span className="text-success views-number">{coin.market_cap_change_percentage_24h}%</span>
                  ) : (
                    <span className="text-danger views-number">{coin.market_cap_change_percentage_24h}%</span>
                  )}
                  <div>
                    <small>market_cap(24h)%</small>
                  </div>
                </div>
              </div>
              <hr />
            </Link>
          ))}
        </div>

        <nav className="mb-5 mt-3">
          <ul className="pagination">
            {page - 1 > 0 ? (
              <li className="page-item">
                <button className="page-link" value={page - 1} onClick={(e) => setPage(e.target.value)}>
                  {page - 1}
                </button>
              </li>
            ) : (
              <button className="page-link" disabled>
                ...
              </button>
            )}

            <li className="page-item">
              <button
                className="page-link btn disabled"
                style={{ height: "2.4rem", width: "2.8rem", color: "black" }}
                value={page}
              >
                {page}
              </button>
            </li>

            <li className="page-item">
              <button className="page-link" value={Number(page) + 1} onClick={(e) => setPage(e.target.value)}>
                {Number(page) + 1}
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" value={Number(page) + 2} onClick={(e) => setPage(e.target.value)}>
                {Number(page) + 2}
              </button>
            </li>
            <li className="page-item ml-3 mt-1">
              <input type="submit" className="btn btn-secondary btn-sm" value="move to Page: " onClick={changePage} />
              <input type="number" value={input} max="130" min="1" onChange={(e) => setInput(e.target.value)} />
            </li>
          </ul>
        </nav>
      </div>
    );
  } else return <div> loading</div>;
};

export default Coins;
