import useAxios from "../../hooks/useAxios";
import CoinTrending from "./CoinTrending";

const Trending = () => {
  const { response, loading } = useAxios("/api/crypto/trending");

  if (loading) {
    return <div className="wrapper-container mt-8">Loading...</div>;
  }

  return (
    <div className="mt-8">
      <h1 className="text-2xl mb-2">Trending</h1>
      <div className="container mt-5">
        <div className="row">
          {response && response.coins.map((coin) => <CoinTrending key={coin.item.coin_id} coin={coin.item} />)}
        </div>
      </div>
    </div>
  );
};

export default Trending;
