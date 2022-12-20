import { useState } from "react";
import "./Profile.css";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { ACCESS_TOKEN } from "../../constants";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = ({ currentUser, deleteAccount }) => {
  const [buffer, setBuffer] = useState(true);
  const navigate = useNavigate();

  // console.log(currentUser.posts);
  // console.log(currentUser.comments);
  if (currentUser)
    return (
      <div className="profile-container">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              {currentUser.imageUrl ? (
                <img src={currentUser.imageUrl} alt={currentUser.name} />
              ) : (
                <div className="text-avatar">
                  <span>{currentUser.name && currentUser.name[0]}</span>
                </div>
              )}
            </div>
            <div className="profile-name">
              <h2>{currentUser.name}</h2>
              <p className="profile-email">{currentUser.email}</p>
            </div>
            {buffer ? (
              <div>
                <button className="btn btn-primary" onClick={() => setBuffer(false)}>
                  Delete your Account
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/");
                    deleteAccount();
                  }}
                >
                  Are you sure?
                </button>
              </div>
            )}
          </div>
          {/* <div> Posts, Comments</div> */}
        </div>
      </div>
    );
};

export default Profile;
