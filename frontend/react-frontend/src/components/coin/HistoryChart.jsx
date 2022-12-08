import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
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
  const { dummy } = [
    [1538856000000, 6593.34, 6600, 6582.63, 6600],
    [1538856900000, 6595.16, 6604.76, 6590.73, 6593.86],
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_BASE_URL + `/api/crypto/${id}/ohlc?vs_currency=usd&days=${days}`, {
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

  if (loading) {
    return (
      <div className="container mb-3">
        <ReactApexChart
          options={{
            chart: {
              type: "candlestick",
              height: 350,
            },
            title: {
              text: "CandleStick Chart",
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
              data: dummy,
            },
          ]}
          type="candlestick"
          height={350}
        />
      </div>
    );
  } else if (response)
    return (
      <div className="container mt-3 mb-3">
        <ReactApexChart
          options={{
            chart: {
              type: "candlestick",
              height: 350,
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
          height={350}
        />
        <div>
          <span className="h5 text-muted">Interval(days): </span>
          <button onClick={(e) => setInterval(e)} value="1" className="btn btn-outline-secondary mr-2 ml-2">
            1
          </button>
          <button onClick={(e) => setInterval(e)} value="7" className="btn btn-outline-secondary mr-2">
            7
          </button>
          <button onClick={(e) => setInterval(e)} value="14" className="btn btn-outline-secondary mr-2">
            14
          </button>
          <button onClick={(e) => setInterval(e)} value="30" className="btn btn-outline-secondary mr-2">
            30
          </button>
          <button onClick={(e) => setInterval(e)} value="90" className="btn btn-outline-secondary mr-2">
            90
          </button>
          <button onClick={(e) => setInterval(e)} value="180" className="btn btn-outline-secondary mr-2">
            180
          </button>
          <button onClick={(e) => setInterval(e)} value="365" className="btn btn-outline-secondary mr-2">
            365
          </button>
        </div>
      </div>
    );
};

export default HistoryChart;