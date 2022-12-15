import "./Posts.css";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { ACCESS_TOKEN } from "../../constants";
import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";

const Comments = ({ currentUser, comments, postId }) => {
  const [body, setBody] = useState("");

  useEffect(() => {
    // getComments();
  }, []);

  // const getComments = () => {
  //   axios
  //     .get(API_BASE_URL + `/api/posts/${postId}/comments`, {
  //       headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
  //     })
  //     .then((res) => {
  //       setComments(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;
  const currentPageData = comments.slice(offset, offset + PER_PAGE).map((comment) => (
    <div className="media" key={comment.id}>
      <div className="media-left">
        <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
      </div>
      <div className="media-body">
        <h6 className="media-heading">
          {comment.user.name}({comment.user.email}) {comment.dateCreated}
        </h6>
        <p>{comment.body}</p>
      </div>
    </div>
  ));
  const pageCount = Math.ceil(comments.length / PER_PAGE);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const createComment = (e) => {
    const comment = { body };

    axios
      .post(API_BASE_URL + `/api/posts/${postId}/comments`, comment, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {currentPageData.length !== 0 ? (
        <div>
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
        </div>
      ) : (
        <div></div>
      )}

      <form onSubmit={createComment}>
        <div className="input-group mb-3">
          <button className="input-group-text" id="inputGroup-sizing-default" type="submit">
            comment
          </button>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Comments;
