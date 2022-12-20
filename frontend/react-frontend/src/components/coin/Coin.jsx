import Posts from "../post/Posts";
import CoinDetail from "./CoinDetail";
import CoinNews from "./CoinNews";
import HistoryChart from "./HistoryChart";
import BuyOrSell from "./BuyOrSell";

const Coin = ({ authenticated, currentUser }) => {
  return (
    <div className="container mt-10">
      <HistoryChart />
      {authenticated ? <BuyOrSell /> : <div>You must be logged in to buy/sell coins.</div>}
      <CoinDetail />
      <CoinNews />
      <Posts currentUser={currentUser} />
    </div>
  );
};

export default Coin;
