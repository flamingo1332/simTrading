import { Link } from "react-router-dom";
const CoinTrending = ({ coin, market }) => {
  return (
    <Link to={`/coins/${coin.id}`} className="col-md-4 text-dark text-decoration-none mb-3  ">
      <div className="card p-3 shadow border ">
        <div className="d-flex flex-row mb-3 ">
          <img src={coin.small} width="40rem" height="40rem" />
          <div className="d-flex flex-column ml-2">
            <span>
              {coin.score + 1}. {coin.name}
              <br />
              <span className="text-black-50">&nbsp; Symbol: {coin.symbol}</span>
            </span>
          </div>
        </div>
        <span>Current Price: ${market.current_price}</span>
        <span>Market Cap: ${market.market_cap}</span>
        <span>
          Price change %(24h):&nbsp;
          {market.price_change_percentage_24h >= 0 ? (
            <span className="text-success font-weight-bold">{market.price_change_percentage_24h}%</span>
          ) : (
            <span className="text-danger font-weight-bold">{market.price_change_percentage_24h}%</span>
          )}
        </span>
        <br />
      </div>
    </Link>
  );
};

export default CoinTrending;
