import { useParams } from "react-router-dom";
import BuyOrSell from "./BuyOrSell";
import useAxios from "../../utils/useAxios";

const CoinDetail = () => {
  const { id } = useParams();
  const { response, loading } = useAxios(
    `/api/coins/data?id=${id}&localization=false&tickers=false&market_data=true&community_data=false&sparkline=false`
  );

  if (loading) return <div className="wrapper-container mt-8">loading...</div>;
  else if (response)
    return (
      <div className="container my-6">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl mb-2 capitalize font-bold">
            <img className="mr-2" src={response.image.small} alt={response.name} />
            {response.name}
          </h1>
        </div>
        <ul>
          <li>Current Price:${response.market_data.current_price.usd}</li>
          <li>Market Cap: ${response.market_data.market_cap.usd}</li>
          <li>
            Price change %(24h):&nbsp;
            {response.market_data.price_change_percentage_24h_in_currency.usd >= 0 ? (
              <span className="text-success font-weight-bold">
                {response.market_data.price_change_percentage_24h_in_currency.usd}%
              </span>
            ) : (
              <span className="text-danger font-weight-bold">
                {response.market_data.price_change_percentage_24h_in_currency.usd}%
              </span>
            )}
          </li>
          <li>
            Price change %(1h):&nbsp;
            {response.market_data.price_change_percentage_1h_in_currency.usd >= 0 ? (
              <span className="text-success font-weight-bold">
                {response.market_data.price_change_percentage_1h_in_currency.usd}%
              </span>
            ) : (
              <span className="text-danger font-weight-bold">
                {response.market_data.price_change_percentage_1h_in_currency.usd}%
              </span>
            )}
          </li>
          <li>Total Supply: {response.market_data.total_supply}</li>
          <li>Circulating Supply: {response.market_data.circulating_supply}</li>
        </ul>

        <p>Description: {response.description.en}</p>

        <hr />
      </div>
    );
};

export default CoinDetail;
