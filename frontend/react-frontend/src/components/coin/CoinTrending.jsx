import { Link, NavLink } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const CoinTrending = ({ coin }) => {
  const { response, loading } = useAxios(
    `/api/crypto/${coin.id}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=false`
  );

  console.log(response);

  if (loading) {
    return (
      <Link to={`/`} className="col-md-4 text-dark text-decoration-none mb-3 ">
        <div className="card p-3 ">
          <div className="d-flex flex-row mb-3 ">
            <img src={coin.small} width="40" />
            <div className="d-flex flex-column ml-2">
              <span>
                {coin.score + 1}. {coin.name}&nbsp;&nbsp; <span className="text-black-50"> {coin.symbol}</span>
              </span>

              <span className="ratings">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </span>
            </div>
          </div>
          <span>Market Cap rank: </span>
          <span className="">Price_usd :</span>
        </div>
      </Link>
    );
  } else if (!loading && response)
    return (
      <Link to={`/coins/${coin.id}`} className="col-md-4 text-dark text-decoration-none mb-3 ">
        <div className="card p-3 ">
          <div className="d-flex flex-row mb-3 ">
            <img src={coin.small} width="40" />
            <div className="d-flex flex-column ml-2">
              <span>
                {coin.score + 1}. {coin.name}&nbsp;&nbsp; <span className="text-black-50"> {coin.symbol}</span>
              </span>

              <span className="ratings">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </span>
            </div>
          </div>
          <span>Current Price: ${response.market_data.current_price.usd}</span>
          <span>Market Cap: ${response.market_data.market_cap.usd}</span>
          <span>
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
          </span>
          <br />
        </div>
      </Link>
    );
};

export default CoinTrending;
