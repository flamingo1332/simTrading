import React, { Component } from "react";
import PostService from "../services/PostService";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//React hooks 사용하기
const ListPostComponent = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    PostService.getPosts()
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = (postId) => {
    console.log(postId);
    PostService.deletePost(postId)
      .then((res) => {
        getAllPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2 className="text-center">Posts</h2>

      {/* react hooks */}
      <Link to={"/create-post"} className="btn btn-primary mb-2">
        Create Post
      </Link>
      {/* <div className="row">
        버튼 누르면 this.createPost, this.createPost는 /create-post 로의 Route
        <button className="btn btn-primary">Create Post</button>
      </div> */}

      <hr />
      <div className="row">
        <table className="table table-striped table-boardered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <Link className="btn btn-info" to={`/edit-post/${post.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-info ml-3" onClick={() => deletePost(post.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// postResponse처리방법 몰라서 일단 dto 사용, pagination기능 없음
// class ListPostComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       posts: [],
//     };

//     this.createPost = this.createPost.bind(this);
//   }

//   componentDidMount() {
//     // rest api용
//     PostService.getPosts().then((res) => {
//       this.setState({ posts: res.data });
//     });
//   }

//   createPost() {
//     // this.props.history.push("/create-post"); react-router-dom 6부터 없어짐, hook 사용해야 함
//     navigate("/create-post");
//   }

//   render() {
//     const navigate = useNavigate();

//   }
// }

export default ListPostComponent;
