import React from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  return (
    <div>
      <h1>User Profile</h1>
      <p>Profile of user with ID: {userId}</p>
    </div>
  );
}

export default UserProfile;
