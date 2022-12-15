import Posts from "../post/Posts";
import CoinDetail from "./CoinDetail";
import CoinNews from "./CoinNews";
import HistoryChart from "./HistoryChart";

const Coin = ({ authenticated, currentUser }) => {
  return (
    <div className="container mt-10">
      <HistoryChart />
      <CoinDetail authenticated={authenticated} currentUser={currentUser} />

      <CoinNews />
      <Posts currentUser={currentUser} />
    </div>
  );
};

export default Coin;
