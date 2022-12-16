import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { API_BASE_URL } from "../../constants";
import { ACCESS_TOKEN } from "../../constants";

const BuyOrSell = ({ accounts }) => {
  const { id } = useParams();
  const [account, setAccount] = useState(accounts[0]);
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {}, []);

  const handleChange = (e) => {
    setAccount(accounts[e.target.value]);
    console.log(account.coins[id]);
  };

  const buyCoin = () => {
    axios
      .get(API_BASE_URL + `/api/accounts/${account.id}/buy?coin=${id}&amount=${buy}&price={}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sellCoin = () => {};
  return (
    <div className="">
      <h2>Buy/Sell</h2>
      {accounts.length !== 0 ? (
        <div>
          <select className="form-select mb-3 mt-3" aria-label="Default select example" onChange={handleChange}>
            <optgroup label="Select Account"></optgroup>
            {accounts.map((account, index) => (
              <option key={account.id} value={index}>
                {account.name}(id:{account.id})
              </option>
            ))}
          </select>
          <span>&nbsp;&nbsp; Account Balance : ${account.balance}</span>
          {/* <span>&nbsp;&nbsp; Coin Balance :{account.balance.coins === undefined ? 0 : account.balance.coins[id]}</span> */}
          <form>
            <button className="btn btn-sm btn-primary mr-3" type="submit" value={buy} onChange={(e) => setBuy(e)}>
              Buy :{" "}
            </button>
            <input type="number" value={buy} onChange={(e) => setBuy(e.target.value)} />
            <br />
            <button className="btn btn-sm btn-primary mr-3" type="submit" value={sell} onChange={(e) => setSell(e)}>
              Sell :{" "}
            </button>
            <input type="number" value={sell} onChange={(e) => setSell(e.target.value)} />
          </form>
        </div>
      ) : (
        <div className="mb-3 mt-3">You need an account. You can make accounts in profile page.</div>
      )}

      <hr />
    </div>
  );
};

export default BuyOrSell;
