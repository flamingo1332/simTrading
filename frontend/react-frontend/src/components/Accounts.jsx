import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./coin/Coins.css";
const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getAccounts();
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

  const createAccount = (e) => {
    e.preventDefault();

    console.log({ name, description, balance: Number(balance) });
    axios
      .post(
        API_BASE_URL + `/api/accounts`,
        { name, description, balance: Number(balance) },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
        }
      )
      .then((res) => {
        console.log(res.data);
        getAccounts();
        toast("Account created!");
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data);
      });
  };

  const deleteAccount = (e) => {
    axios
      .delete(API_BASE_URL + `/api/accounts/${e.target.value}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .then((res) => {
        console.log(res.data);
        getAccounts();
        toast(`Account(id: ${e.target.value}) Deleted!`);
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data);
      });
  };

  const showDetail = () => {
    console.log("jaha");
  };

  if (accounts)
    return (
      <div className="container mt-5 mb-5">
        <ol className="list-group list-group-numbered">
          <li className="list-group-item d-flex justify-content-between align-items-start shadow background border">
            <form onSubmit={(e) => createAccount(e)}>
              <div className="form-row">
                <div className="col">
                  Account Name:{" "}
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col">
                  Initial Balance($):
                  <input
                    type="number"
                    size=""
                    className="form-control"
                    value={balance}
                    min="100"
                    placeholder="100 or higher"
                    step="1"
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </div>
                <div className="col">
                  Description:
                  <input
                    type="text"
                    size=""
                    className="form-control"
                    placeholder="below 100 characters"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Create Account
              </button>
            </form>
          </li>
        </ol>

        <div className="ibox-content forum-container mt-3">
          {accounts.map((account) => (
            <div key={account.id} className="forum-item active border-bottom">
              <div className="row">
                <div className="col-md-9">
                  <div className="container ">
                    id: {account.id} Name: {account.name} &nbsp;&nbsp; Description: {account.description} <br />
                    Balance: ${account.balance} / Total: ${account.total}
                  </div>
                  <br />
                  <span className="forum-sub-title text-muted">-Coins</span>

                  {Object.keys(account.coins).map((key) => (
                    <div key={key} className="forum-sub-title text-muted">
                      <Link to={`/coins/${key}`}>
                        {key}: {account.coins[key]}
                      </Link>
                    </div>
                  ))}
                  <br />
                  <span className="forum-sub-title text-muted">-History</span>
                  {account.buyOrders.map((order) => (
                    <div key={order.id} className="forum-sub-title text-muted">
                      {order.date} : bought {order.amount} {order.symbol}
                    </div>
                  ))}
                  {account.sellOrders.map((order) => (
                    <div key={order.id} className="forum-sub-title text-muted">
                      {order.date} : sold {order.amount} {order.symbol}
                    </div>
                  ))}
                </div>
                <div className="col-md-1 forum-info mr-3">
                  <button className="btn btn-info ml-3" value={account.id} onClick={(e) => deleteAccount(e)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};
export default Accounts;
