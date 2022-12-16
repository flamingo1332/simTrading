import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

  if (accounts)
    return (
      <div className="container mt-5 mb-5">
        <ol className="list-group list-group-numbered">
          <li className="list-group-item d-flex justify-content-between align-items-start">
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

          {accounts &&
            accounts.map((acc) => (
              <li key={acc.id} className="list-group-item d-flex justify-content-between align-items-start">
                <Link>
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Account Id: {acc.id}</div>
                    <div className="fw-bold">Account Name: {acc.name}</div>
                    <div className="fw-bold">Description: {acc.description}</div>
                    <div className="fw-bold">
                      Balance: {acc.balance}, Total: {acc.total}
                    </div>
                  </div>
                </Link>
                <span className="badge bg-primary rounded-pill"></span>
              </li>
            ))}
        </ol>
      </div>
    );
};
export default Accounts;
