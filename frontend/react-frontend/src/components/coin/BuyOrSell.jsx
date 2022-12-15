import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const BuyOrSell = ({ accounts }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  useEffect(() => {}, []);

  // console.log(accounts);
  const getAccountBalance = (e) => {
    setAccount(e.target.value);
    axios.get();
  };
  return (
    <div className="">
      <h2>Buy/Sell</h2>
      {accounts ? (
        <div>
          <select
            className="form-select mb-3 mt-3"
            aria-label="Default select example"
            onChange={(e) => {
              setAccount(e.target.value);
              setBalance(e.target.value);
              console.log(account);
            }}
          >
            <optgroup label="Select Account"></optgroup>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc}>
                {acc.name}
              </option>
            ))}
          </select>
          <span>&nbsp;&nbsp; Account Balance : ${balance}</span>
          <span>&nbsp;&nbsp; Coin Balance : </span>
          <form>
            <button className="btn btn-sm btn-primary mr-3" type="submit" value="buy">
              Buy :{" "}
            </button>
            <input type="number" value={buy} onChange={(e) => setBuy(e.target.value)} />
            <br />
            <button className="btn btn-sm btn-primary mr-3" type="submit" value="sell">
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
