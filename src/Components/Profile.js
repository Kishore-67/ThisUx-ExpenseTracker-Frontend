import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { RxAvatar } from "react-icons/rx";

const Profile = () => {
  const [user, setUser] = useState({}); 

  useEffect(() => {
    // Assuming you stored user in localStorage or sessionStorage
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    setUser(storedUser);
  }, []);

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="avatar">
          <RxAvatar size={100} />
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.username || '-'}</p>
          <p><strong>Email:</strong> {user.email || '-'}</p>
          <p><strong>Password:</strong> ********</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
