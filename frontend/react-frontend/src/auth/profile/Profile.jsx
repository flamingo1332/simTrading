import "./Profile.css";

const Profile = (props) => {
  const currentUser = props.currentUser;
  console.log(currentUser);

  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile-info">
          <div className="profile-avatar">
            {/* {currentUser.imageUrl ? (
              <img src={currentUser.imageUrl} alt={currentUser.name} />
            ) : (
              <div className="text-avatar">
                <span>{currentUser.name && currentUser.name[0]}</span>
              </div>
            )} */}
          </div>
          <div className="profile-name">
            <h2>{currentUser.name}</h2>
            <p className="profile-email">{currentUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
