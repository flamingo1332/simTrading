import axios from "axios";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";

const useAxios = (param) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  axios.defaults.baseURL = "http://localhost:8080";
  axios.defaults.headers.common = { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) };

  const fetchData = async () => {
    console.log("fetching data");
    setLoading(true);
    await axios
      .get(param)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, loading, error };
};

export default useAxios;
