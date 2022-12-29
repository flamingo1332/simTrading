import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { API_BASE_URL } from "../../constants";
import { ACCESS_TOKEN } from "../../constants";
import { toast } from "react-toastify";

const BuyOrSell = () => {
  const { id } = useParams();
  const [accountId, setAccountId] = useState(0);
  const [accounts, setAccounts] = useState([]);

  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getAccounts();
    console.log(accounts);
  }, []);

  useEffect(() => {
    //update price every min
    getPrice();
    const interval = setInterval(getPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const getAccounts = () => {
    axios
      .get(API_BASE_URL + `/api/accounts`, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPrice = async () => {
    // price update every
    const result = await axios.get(API_BASE_URL + `/api/coins/price?id=${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
    });

    setPrice(result.data[id]["usd"]);
  };

  const selectAccount = (e) => {
    setAccountId(e.target.value);
    console.log(accountId);
  };

  const buyCoin = () => {
    if (buy * price > accounts[accountId].balance) {
      toast("Not enough balance");
    } else {
      axios
        .post(API_BASE_URL + `/api/accounts/${accounts[accountId].id}/buy?coin=${id}&amount=${buy}&price=${price}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
        })
        .then((res) => {
          console.log(res.data);
          toast(`${buy} ${id} bought to your account(id: ${accounts[accountId].id})`);
          getAccounts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const sellCoin = () => {
    const coinBalance = accounts[accountId].coins[id] ? accounts[accountId].coins[id] : 0;
    if (sell > coinBalance) {
      toast("You can't sell more than you have.");
    } else {
      axios
        .post(API_BASE_URL + `/api/accounts/${accounts[accountId].id}/sell?coin=${id}&amount=${sell}&price=${price}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
        })
        .then((res) => {
          console.log(res.data);
          toast(`${sell} ${id} sold from your account(id: ${accounts[accountId].id})`);
          getAccounts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <h2>Buy/Sell</h2>
      {accounts.length !== 0 ? (
        <div>
          <select className="form-select  mt-3" aria-label="Default select example" onChange={selectAccount}>
            <optgroup label="Select Account"></optgroup>
            {accounts.map((account, index) => (
              <option key={account.id} value={index}>
                {account.name}(id:{account.id})
              </option>
            ))}
          </select>
          <br />
          Account Balance: ${accounts[accountId].balance}
          <br />
          {id.toUpperCase()} Balance:
          {accounts[accountId].coins[id]
            ? accounts[accountId].coins[id] + ` ($${accounts[accountId].coins[id] * price})`
            : 0}
          <br />
          Current Price: ${price}
          <div>
            <button className="btn btn-sm btn-primary mr-3" type="submit" value={buy} onClick={buyCoin}>
              Buy :{" "}
            </button>
            <input type="number" value={buy} onChange={(e) => setBuy(e.target.value)} min="0" />
            &nbsp; Total: ${buy * price}
            <br />
            <button className="btn btn-sm btn-primary mr-3" type="submit" value={sell} onClick={sellCoin}>
              Sell :{" "}
            </button>
            <input type="number" value={sell} onChange={(e) => setSell(e.target.value)} min="0" />
            &nbsp; Total: ${sell * price}
          </div>
        </div>
      ) : (
        <div className="mb-3 mt-3">You need an account. You can make accounts in Accounts page.</div>
      )}

      <hr />
    </div>
  );
};

export default BuyOrSell;
