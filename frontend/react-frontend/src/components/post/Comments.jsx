import "./Posts.css";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { ACCESS_TOKEN } from "../../constants";
import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const Comments = ({ postId }) => {
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    axios
      .get(API_BASE_URL + `/api/posts/${postId}/comments`, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    e.preventDefault(); // post request다음에 페이지 refresh안되게

    axios
      .post(
        API_BASE_URL + `/api/posts/${postId}/comments`,
        { body },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
        }
      )
      .then(() => {
        getComments();
        toast("comment created!");
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
            previousClassName="page-link mt-1"
            nextClassName="page-link mt-1"
            breakLabel="..."
            pageLinkClassName="page-link mt-1"
            pageClassName="page"
            previousLabel="&laquo;"
            nextLabel="&raquo;"
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

      <form onSubmit={(e) => createComment(e)}>
        <div className="input-group mb-3 ">
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button className=" btn btn-dark" id="inputGroup-sizing-default" style={{ height: "35px" }} type="submit">
            comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
