import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import googleLogo from "../img/google-logo.png";
import { GOOGLE_AUTH_URL } from "../constants";
import "./Header.css";
import { useState } from "react";

const Header = (props) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
    props.handleLogout();
  };

  const searchQuery = () => {
    navigate(`/search/${query}`);
  };

  return (
    <div className="container ">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-dark rounded shadow">
          <Link to={"/"} className="navbar-brand text-light" style={{ fontSize: "1.5rem" }}>
            SimTrading
          </Link>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/coins"} className="nav-link  text-light">
                  Coins{" "}
                  <span style={{ fontSize: "13px", fontStyle: "italic" }} className="font-sm">
                    by Market cap
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <form onSubmit={searchQuery}>
                  <input
                    className="form-control mt-1 ml-2 my-input"
                    type="text"
                    placeholder="Search Coins"
                    aria-label="Search"
                    value={query}
                    style={{ background: "transparent", color: "white" }}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button type="submit" value="NONE" style={{ display: "none" }} />
                </form>
              </li>
            </ul>
            {props.authenticated ? (
              <ul className="navbar-nav ">
                <li>
                  <Link to={"/profile"} className="nav-link text-light">
                    {props.currentUser.email}
                  </Link>
                </li>
                <li>
                  <Link to={"/accounts"} className="nav-link text-light">
                    Accounts
                  </Link>
                </li>
                <li>
                  {/* 로그아웃 Link 사용하면 useNavigate 안됌 */}
                  <Link onClick={() => logOut()} className="nav-link border-0 btn-link btn text-light">
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ">
                <li>
                  <a href={GOOGLE_AUTH_URL} className="btn btn-light btn-sm" type="submit">
                    <img src={googleLogo} width="30px" /> Log in with Google
                  </a>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </header>
      <hr />
    </div>
  );
};

// const HeaderComponent = () => {
//   return (
//     <div>
//       <header>
//         <nav className="navbar navbar-expand-md navbar-dark bg-dark">
//           <div>
//             <Link to={"/"} className="navbar-brand">
//               SimTrading
//             </Link>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// };

// class HeaderComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   componentWillMount() {}

//   componentDidMount() {}

//   componentWillReceiveProps(nextProps) {}

//   shouldComponentUpdate(nextProps, nextState) {}

//   componentWillUpdate(nextProps, nextState) {}

//   componentDidUpdate(prevProps, prevState) {}

//   componentWillUnmount() {}

//   render() {
//     return (
//       <div>
//         <header>
//           <nav className="navbar navbar-expand-md navbar-dark bg-dark">
//             <div>
//               <a href="https://javaguides.net" className="navbar-brand">
//                 SimTrading
//               </a>
//             </div>
//           </nav>
//         </header>
//       </div>
//     );
//   }
// }

Header.propTypes = {};

export default Header;
