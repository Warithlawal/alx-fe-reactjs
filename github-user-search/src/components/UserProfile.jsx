import React from 'react';

const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user-profile p-4 border rounded shadow-lg">
      <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full" />
      <h2 className="text-xl mt-4">{user.name}</h2>
      <p>{user.bio}</p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        View GitHub Profile
      </a>
    </div>
  );
};

export default UserProfile;
