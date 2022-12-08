import React, { Component } from "react";
import { useState, useEffect } from "react";
import PostService from "../hooks/PostService";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const CreatePostComponent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const createOrUpdatePost = (e) => {
    e.preventDefault();

    const post = { title, content };

    if (id) {
      PostService.updatePost(post, id)
        .then((res) => {
          console.log(res.data);
          navigate("/posts");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      PostService.createPost(post)
        .then((res) => {
          console.log(res.data);
          navigate("/posts");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    PostService.getPostById(id)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createOrEdit = () => {
    if (id) return <h2 className="text-center">Edit Post</h2>;
    else return <h2 className="text-center">Create Post</h2>;
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {createOrEdit()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Title : </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Content : </label>
                  <textarea
                    type="text"
                    placeholder=""
                    name="content"
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>

                <button className="btn btn-success" onClick={(e) => createOrUpdatePost(e)}>
                  Submit
                </button>
                <Link to={"/posts"} className="btn btn-success ml-2">
                  Back to posts
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// class CreatePostComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   componentWillMount() {}

//   componentDidMount() {}

//   componentWillReceiveProps(nextProps) {}

//   shouldComponentUpdate(nextProps, nextState) {}

//   componentWillUpdate(nextProps, nextState) {}

//   componentDidUpdate(prevProps, prevState) {}

//   componentWillUnmount() {}

//   render() {
//     return (
//       <div>
//         <h2>Create Post</h2>
//       </div>
//     );
//   }
// }

CreatePostComponent.propTypes = {};

export default CreatePostComponent;
