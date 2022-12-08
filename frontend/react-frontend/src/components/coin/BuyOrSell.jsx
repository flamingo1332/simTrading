import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const BuyOrSell = ({ coin }) => {
  const { accounts } = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  useEffect(() => {}, []);

  const getAccountBalance = (e) => {
    setAccount(e.target.value);
    axios.get();
  };
  return (
    <div className="">
      <h2>Buy/Sell</h2>
      {accounts == null ? (
        <select
          className="form-select mb-3 mt-3"
          aria-label="Default select example"
          onChange={(e) => getAccountBalance()}
        >
          <option selected>Select Account</option>
          {/* {accounts.map((acc) => {
            <option value={acc.id}>{acc.name}</option>;
          })} */}
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      ) : (
        <div className="mb-3 mt-3">You need an account. You can make accounts in profile page.</div>
      )}
      &nbsp;&nbsp; Account Balance : ${balance}
      <form>
        <button className="btn btn-primary mr-3" type="submit" value="buy">
          Buy :{" "}
        </button>
        <input />
        <button className="btn btn-primary mr-3" type="submit" value="sell">
          Sell :{" "}
        </button>
        <input />
      </form>
      <hr />
    </div>
  );
};

export default BuyOrSell;
