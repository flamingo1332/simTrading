import "./Login.css";
import googleLogo from "../../img/google-logo.png";
import { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { login } from "../APIUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GOOGLE_AUTH_URL } from "../../constants";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.error) {
      toast.error("error: " + location.state.error);
    }
  }, []);

  const handleInputChangeEmail = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handleInputChangePassword = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginRequest = Object.assign({}, { email }, { password });
    console.log(loginRequest);

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        toast.success("You are logged in!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong. please try again!");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Login</h5>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(event) => handleInputChangeEmail(event)}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => handleInputChangePassword(event)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                    Login
                  </button>
                </div>
              </form>
              <hr className="my-4" />
              <div className="d-grid mb-2">
                <a href={GOOGLE_AUTH_URL} className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                  <img src={googleLogo} className="google" /> Log in with Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
