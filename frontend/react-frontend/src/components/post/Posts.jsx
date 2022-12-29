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
  const [body, setBody] = useState("");
  const [isEdit, setIsEdit] = useState([]);
  const [edit, setEdit] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios
      .get(API_BASE_URL + `/api/posts/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsEdit(Array(posts.length).fill(false));
  };

  const deletePost = (e) => {
    axios
      .delete(API_BASE_URL + `/api/posts/${e.target.value}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
      })
      .then(() => {
        getPosts();
        toast("comment deleted!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //bad request나던 이유 -> view attribute 지웠는데 db테이블에는 남아있어 default value 없다고 에러남
  const createPost = (e) => {
    e.preventDefault();

    axios
      .post(
        API_BASE_URL + "/api/posts",
        { body, coin: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
        }
      )
      .then(() => {
        getPosts();
        toast("comment created!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPost = (e) => {
    e.preventDefault(); // post request다음에 페이지 refresh안되게

    axios
      .put(
        API_BASE_URL + `/api/posts/${e.target[1].value}`, //index아니라 postId사용
        { body: edit, coin: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
        }
      )
      .then(() => {
        getPosts();
        toast("comment edited!");
        setIsEdit(Array(posts.length).fill(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openEdit = (e) => {
    //index사용해 edit 상태조절
    const arr = Array(posts.length).fill(false);
    if (isEdit[e.target.value]) arr[e.target.value] = false;
    else arr[e.target.value] = true;

    setIsEdit(arr);
    setEdit(posts[e.target.value].body); //for prepopulating input field
  };

  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const currentPageData = posts.slice(offset, offset + PER_PAGE).map((post, index) => (
    <div className="container" key={post.id}>
      <div className="row">
        <div className="media comment-box">
          <div className="media-left">
            {post.user.imageUrl ? (
              <img className="img-responsive user-photo" src={post.user.imageUrl} />
            ) : (
              <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            )}
          </div>

          <div className="media-body">
            <h5 className="media-heading">
              {post.user.name} ({post.user.email}) {post.dateCreated}
              {post.dateCreated !== post.dateUpdated ? <span> / edited: {post.dateUpdated}</span> : <span></span>}
              &nbsp; &nbsp;
              {currentUser && post.user.id === currentUser.id ? (
                <div>
                  <button className="btn-sm btn btn-outline-dark mr-1" value={index} onClick={(e) => openEdit(e)}>
                    edit
                  </button>
                  <button className="btn-sm btn btn-outline-dark" value={post.id} onClick={(e) => deletePost(e)}>
                    delete
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </h5>

            {!isEdit[index] ? (
              <p>{post.body}</p>
            ) : (
              <form onSubmit={editPost} value={1}>
                <input
                  className="form-control mb-3 my-input"
                  type="text"
                  value={edit}
                  style={{ background: "", color: "black" }}
                  onChange={(e) => setEdit(e.target.value)}
                />
                <input type="submit" value={post.id} style={{ display: "none" }} />
              </form>
            )}

            <Comments postId={post.id} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  ));
  const pageCount = Math.ceil(posts.length / PER_PAGE);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="container mb-5">
      <hr />
      <h2>Comments ({id})</h2>

      <form onSubmit={(e) => createPost(e)}>
        <div className="form-row">
          <div className="col">
            <textarea
              type="text"
              width="300"
              className="form-control shadow-sm"
              placeholder="write comment here..."
              rows="3"
              cols="60"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-dark mt-3 ">
          Comment
        </button>
      </form>
      <hr />
      {/* </li> */}

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
      {/* </ul> */}
    </div>
  );
};
export default Posts;
