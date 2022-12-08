import CoinDetail from "./CoinDetail";
import CoinNews from "./CoinNews";
import HistoryChart from "./HistoryChart";

const Coin = ({ authenticated }) => {
  return (
    <div className="container mt-10">
      <HistoryChart />
      <CoinDetail authenticated={authenticated} />

      <CoinNews />
    </div>
  );
};

export default Coin;
