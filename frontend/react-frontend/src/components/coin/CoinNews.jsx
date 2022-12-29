import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";

const CoinNews = () => {
  const { id } = useParams();
  const { response, loading, error } = useAxios(`/api/coins/news?id=${id}`);

  if (loading) return <div className="wrapper-container mt-8">loading...</div>;
  else if (error || !response) return <div className="wrapper-container mt-8"> News Not Found </div>;
  else if (response)
    return (
      <div className="container mt-8">
        <h2>Latest News of {id}</h2>
        <div className="row ">
          {response &&
            response.articles.map((article) => (
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
