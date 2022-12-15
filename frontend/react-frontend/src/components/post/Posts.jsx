import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { ACCESS_TOKEN } from "../../constants";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "./Posts.css";
import Comments from "./Comments";

const Posts = ({ currentUser }) => {
  //   const [accounts, setAccounts] = useState(useAxios("/api/accounts/update"));

  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios
      .get(API_BASE_URL + `/api/posts/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;
  const currentPageData = posts.slice(offset, offset + PER_PAGE).map((post) => (
    <div className="container" key={post.id}>
      <div className="row">
        <div className="media comment-box">
          <div className="media-left">
            {post.user.imageUrl ? (
              <div>
                <img className="img-responsive user-photo" src={post.user.imageUrl} />
              </div>
            ) : (
              <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            )}
          </div>

          <div className="media-body">
            <h5 className="media-heading">
              {post.user.name} ({post.user.email}) {post.dateCreated}
            </h5>
            <p>{post.content}</p>
            <Comments currentUser={currentUser} comments={post.comments} postId={post.id} />
          </div>
        </div>
      </div>
    </div>
  ));
  const pageCount = Math.ceil(posts.length / PER_PAGE);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const createPost = (e) => {
    const coin = id;
    const post = { content, coin };
    axios
      .post(API_BASE_URL + "/api/posts", post, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .catch((err) => {
        console.log(err);
      });

    getPosts();
  };

  return (
    <div className="container mb-5">
      <hr />
      <h2>Posts related to {id}</h2>

      <form onSubmit={(e) => createPost(e)}>
        <div className="form-row">
          <div className="col">
            <textarea
              type="text"
              width="300"
              className="form-control"
              placeholder=""
              rows="3"
              cols="60"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Comment
        </button>
      </form>
      {/* </li> */}

      {currentPageData}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {/* </ul> */}
    </div>
  );
};
export default Posts;
