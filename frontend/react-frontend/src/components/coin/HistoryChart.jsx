import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../../constants";

const HistoryChart = () => {
  const { id } = useParams();
  const [days, setDays] = useState("30");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_BASE_URL + `/api/coins/ohlc?id=${id}&vs_currency=usd&days=${days}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [days]); //days값 변화시 실행되게 만듬

  const setInterval = (event) => {
    setDays(event.target.value);
  };

  if (!loading && response)
    return (
      <div className="container mt-3 mb-3">
        <ReactApexChart
          options={{
            chart: {
              type: "candlestick",
              height: 350,
              background: "#EEEEEE",
              fontFamily: "italic",
            },

            title: {
              text: id.toUpperCase(),
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
          series={[
            {
              data: response,
            },
          ]}
          type="candlestick"
          height={500}
        />
        <div>
          <span className="h5 text-muted">Interval(days): </span>
          <button onClick={(e) => setInterval(e)} value="1" className="btn btn-outline-secondary mr-2 ml-2">
            1D
          </button>
          <button onClick={(e) => setInterval(e)} value="7" className="btn btn-outline-secondary mr-2">
            1W
          </button>
          <button onClick={(e) => setInterval(e)} value="14" className="btn btn-outline-secondary mr-2">
            2W
          </button>
          <button onClick={(e) => setInterval(e)} value="30" className="btn btn-outline-secondary mr-2">
            1M
          </button>
          <button onClick={(e) => setInterval(e)} value="90" className="btn btn-outline-secondary mr-2">
            3M
          </button>
          <button onClick={(e) => setInterval(e)} value="180" className="btn btn-outline-secondary mr-2">
            6M
          </button>
          <button onClick={(e) => setInterval(e)} value="365" className="btn btn-outline-secondary mr-2">
            1Y
          </button>
          <hr />
        </div>
      </div>
    );
};

export default HistoryChart;
