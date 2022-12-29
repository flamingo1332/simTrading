import { useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const OAuth2RedirectHandler = () => {
  const [params] = new useSearchParams();
  const token = params.get("token");
  const error = params.get("error");
  const navigate = useNavigate();

  console.log("oauth2RedirectHandler");
  console.log(token);
  console.log(error);

  useEffect(() => {
    if (token != null) {
      localStorage.setItem(ACCESS_TOKEN, token);
      toast.success("You are logged in!", {
        toastId: "login1", //id넣어주면 중복안됌. recommended solution from the documentation: fkhadra.github.io/react-toastify/prevent-duplicate
      });
      navigate("/");
    } else {
      toast.failure("something went wrong. please try again.");
      navigate("/", { state: { error: error } });
    }
  }, []);
};
export default OAuth2RedirectHandler;
