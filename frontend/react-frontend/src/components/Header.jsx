import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import googleLogo from "../img/google-logo.png";
import { GOOGLE_AUTH_URL } from "../constants";

const Header = (props) => {
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
    props.handleLogout();
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={"/"} className="navbar-brand">
            SimTrading
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/coins"} className="nav-link">
                  Coins
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/posts"} className="nav-link">
                  Posts
                </Link>
              </li>
            </ul>
            {props.authenticated ? (
              <ul className="navbar-nav ">
                <li>
                  <Link to={"/profile"} className="nav-link">
                    {props.currentUser.name} ( {props.currentUser.email})
                  </Link>
                </li>
                <li>
                  {/* 로그아웃 Link 사용하면 useNavigate 안됌 */}
                  <button onClick={() => logOut()} className="nav-link border-0 btn-link btn">
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ">
                <li>
                  <a href={GOOGLE_AUTH_URL} className="btn btn-primary btn-sm" type="submit">
                    <img src={googleLogo} width="30px" /> Log in with Google
                  </a>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </header>
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
