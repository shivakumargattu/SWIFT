import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles.css';

const Profile = () => {
  const { state } = useLocation();
  const user = state?.user;
  const navigate = useNavigate();

  if (!user) return <div>No user data available</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>SWIFT</h1>
        <h2>Welcome, {user.name}</h2>
      </div>

      <div className="profile-details">
        <div className="detail-row">
          <span>User ID:</span>
          <span>{user.id}</span>
        </div>
        <div className="detail-row">
          <span>Name:</span>
          <span>{user.name}</span>
        </div>
        <div className="detail-row">
          <span>Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="detail-row">
          <span>Phone:</span>
          <span>{user.phone}</span>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default Profile;