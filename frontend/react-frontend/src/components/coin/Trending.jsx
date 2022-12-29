import useAxios from "../../utils/useAxios";
import CoinTrending from "./CoinTrending";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from "../../constants";

const Trending = () => {
  const { response, loading } = useAxios("/api/coins/trending");
  const [marketData, setMarketData] = useState(null); //market data (trending coins)

  useEffect(() => {
    if (response) {
      const temp = response.coins.map((coin) => {
        return `${coin.item.id}`;
      });

      axios
        .get(API_BASE_URL + `/api/coins/markets?id=${temp.toString()}&per_page=10&page=1`, {
          headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
        })
        .then((res) => {
          setMarketData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [response]);

  if (loading) {
    return <div className="wrapper-container mt-8">Loading...</div>;
  } else if (response && marketData)
    return (
      <div className="mt-8">
        <h1 className="text-2xl mb-2">Top 7 Trending Coins</h1>
        <div className="container mt-5">
          <div className="row ">
            {response &&
              response.coins.map((coin) => (
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
