import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { API_BASE_URL } from "../../constants";
import axios from "axios";
import { ACCESS_TOKEN } from "../../constants";

const CoinNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const headers = localStorage.getItem(ACCESS_TOKEN)
    ? { headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` } }
    : {};

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    axios
      .get(API_BASE_URL + `/api/coins/news?id=${id}`, headers)
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!news) return <div className="wrapper-container mt-8">loading...</div>;
  else if (news.length === 0) return <div className="wrapper-container mt-8"> News Not Found </div>;
  else
    return (
      <div className="container mt-8">
        <h2>Latest News of {id}</h2>
        <div className="row ">
          {news &&
            news.articles.map((article) => (
              <a
                key={article.title}
                href={article.url}
                className="col border border-secondary shadow 
              p-3 mb-5 bg-body rounded mr-3 list-group-item list-group-item-action"
              >
                <h4>{article.title}</h4>
                <hr />
                by {article.author ? article.author : "Anonymous"}
              </a>
            ))}
        </div>
      </div>
    );
};

export default CoinNews;
