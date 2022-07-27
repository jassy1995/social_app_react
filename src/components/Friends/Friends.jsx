import React from "react";

const Friends = ({ friend }) => {
  return (
    <li className="flex items-center space-x-3">
      <img
        src={friend.profilePicture}
        alt="not exist"
        className="w-8 h-8 rounded-full cursor-pointer object-cover"
      />
      <span className="text-sm">{friend.username}</span>
    </li>
  );
};

export default Friends;
