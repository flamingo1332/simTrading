import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = (props) => {
  console.log(props);
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
                <Link to={"/"} className="nav-link">
                  Stock
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
                  <a onClick={() => logOut()} className="nav-link">
                    Logout
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ">
                <li>
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to={"/signup"} className="nav-link">
                    Signup
                  </Link>
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
