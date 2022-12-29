import "./Posts.css";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { ACCESS_TOKEN } from "../../constants";
import { useEffect } from "react";
import useAxios from "../../utils/useAxios";
import { toast } from "react-toastify";

const Comments = ({ postId, currentUser }) => {
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);
  const [isEdit, setIsEdit] = useState([]);
  const [edit, setEdit] = useState("");

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    axios
      .get(API_BASE_URL + `/api/comments/${postId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsEdit(Array(comments.length).fill(false));
  };

  const deleteComment = (e) => {
    axios
      .delete(API_BASE_URL + `/api/comments/${e.target.value}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
      })
      .then(() => {
        getComments();
        toast("comment deleted!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createComment = (e) => {
    e.preventDefault(); // post request다음에 페이지 refresh안되게

    axios
      .post(
        API_BASE_URL + `/api/comments/${postId}`,
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

  const editComment = (e) => {
    e.preventDefault(); // post request다음에 페이지 refresh안되게

    axios
      .put(
        API_BASE_URL + `/api/comments/${e.target[1].value}`,
        { body: edit },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
        }
      )
      .then(() => {
        getComments();
        toast("comment edited!");
        setIsEdit(Array(comments.length).fill(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openEdit = (e) => {
    const arr = Array(comments.length).fill(false);
    if (isEdit[e.target.value]) arr[e.target.value] = false;
    else arr[e.target.value] = true;

    setIsEdit(arr);
    setEdit(comments[e.target.value].body); //for prepopulating input field
  };

  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;
  const currentPageData = comments.slice(offset, offset + PER_PAGE).map((comment, index) => (
    <div className="media" key={comment.id}>
      <div className="media-left">
        {comment.user.imageUrl ? (
          <img className="img-responsive user-photo" src={comment.user.imageUrl} />
        ) : (
          <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
        )}
      </div>
      <div className="media-body">
        <h6 className="media-heading">
          {comment.user.name}({comment.user.email}) {comment.dateCreated}
          {comment.dateCreated !== comment.dateUpdated ? <span> / edited: {comment.dateUpdated}</span> : <span></span>}
          &nbsp; &nbsp;
          {comment.user.id === currentUser.id ? (
            <div>
              <button className="btn-sm btn btn-outline-dark mr-1" value={index} onClick={(e) => openEdit(e)}>
                edit
              </button>
              <button className="btn-sm btn btn-outline-dark" value={comment.id} onClick={(e) => deleteComment(e)}>
                delete
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </h6>

        {!isEdit[index] ? (
          <p>{comment.body}</p>
        ) : (
          <form onSubmit={editComment}>
            <input
              className="form-control mt-1 my-input"
              type="text"
              placeholder=""
              value={edit}
              style={{ background: "", color: "black" }}
              onChange={(e) => setEdit(e.target.value)}
            />
            <input type="submit" value={comment.id} style={{ display: "none" }} />
          </form>
        )}
      </div>
    </div>
  ));
  const pageCount = Math.ceil(comments.length / PER_PAGE);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
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
