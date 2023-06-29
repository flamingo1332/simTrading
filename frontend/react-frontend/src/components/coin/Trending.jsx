import CoinTrending from "./CoinTrending";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from "../../constants";

const Trending = () => {
  const [marketData, setMarketData] = useState([]);
  const [trending, setTrending] = useState(null);
  const headers = localStorage.getItem(ACCESS_TOKEN)
    ? { headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` } }
    : {};

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/api/coins/trending/", headers)
      .then((res) => {
        setTrending(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (trending !== null) {
      const temp = trending.coins.map((coin) => {
        return `${coin.item.id}`;
      });

      getMarketData(temp.toString());
    }
  }, [trending]);


  const getMarketData = (id) => {
    axios
      .get(API_BASE_URL + `/api/coins/markets?id=${id}&per_page=10&page=1`, headers)
      .then((res) => {
        setMarketData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (marketData.length !== 0)
    return (
      <div className="mt-8">
        <h1 className="text-2xl mb-2">Top 7 Trending Coins</h1>
        <div className="container mt-5">
          <div className="row ">
            {trending &&
              trending.coins.map((coin) => (
                <CoinTrending
                  key={coin.item.coin_id}
                  coin={coin.item}
                  market={marketData.find((res) => res.id === coin.item.id)}
                />
              ))}
          </div>
        </div>
      </div>
    );
};

export default Trending;
