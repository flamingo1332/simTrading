import { useParams } from "react-router-dom";
import BuyOrSell from "./BuyOrSell";
import useAxios from "../../utils/useAxios";
import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "../../constants";
import axios from "axios";
import { ACCESS_TOKEN } from "../../constants";

const CoinDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const headers = localStorage.getItem(ACCESS_TOKEN)
    ? { headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` } }
    : {};

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    axios
      .get(
        API_BASE_URL +
          `/api/coins/data?id=${id}&localization=false&tickers=false&market_data=true&community_data=false&sparkline=false`,
        headers
      )
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!details) return <div className="wrapper-container mt-8">loading...</div>;
  else
    return (
      <div className="container my-6">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl mb-2 capitalize font-bold">
            <img className="mr-2" src={details.image.small} alt={details.name} />
            {details.name}
          </h1>
        </div>
        <ul>
          <li>Current Price:${details.market_data.current_price.usd}</li>
          <li>Market Cap: ${details.market_data.market_cap.usd}</li>
          <li>
            Price change %(24h):&nbsp;
            {details.market_data.price_change_percentage_24h_in_currency.usd >= 0 ? (
              <span className="text-success font-weight-bold">
                {details.market_data.price_change_percentage_24h_in_currency.usd}%
              </span>
            ) : (
              <span className="text-danger font-weight-bold">
                {details.market_data.price_change_percentage_24h_in_currency.usd}%
              </span>
            )}
          </li>
          <li>
            Price change %(1h):&nbsp;
            {details.market_data.price_change_percentage_1h_in_currency.usd >= 0 ? (
              <span className="text-success font-weight-bold">
                {details.market_data.price_change_percentage_1h_in_currency.usd}%
              </span>
            ) : (
              <span className="text-danger font-weight-bold">
                {details.market_data.price_change_percentage_1h_in_currency.usd}%
              </span>
            )}
          </li>
          <li>Total Supply: {details.market_data.total_supply}</li>
          <li>Circulating Supply: {details.market_data.circulating_supply}</li>
        </ul>

        <p>Description: {details.description.en}</p>

        <hr />
      </div>
    );
};

export default CoinDetail;
