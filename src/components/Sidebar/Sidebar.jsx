import React from "react";
import {
  MdRssFeed,
  MdOutlineHelpOutline,
  MdBookmark,
  MdGroup,
  MdWorkOutline,
  MdPlayCircle,
  MdEvent,
  MdSchool,
} from "react-icons/md";
import { BsChatLeftTextFill } from "react-icons/bs";
import { Users } from "dummyData";
import "./Sidebar.css";
import Friends from "components/Friends/Friends";

function Sidebar() {
  return (
    <div className="w-[20%] h-[calc(100vh-50px)] overflow-y-scroll sticky top-50">
      <div className="p-7">
        <ul className="flex-col space-y-4">
          <li className="flex items-center space-x-3">
            <MdRssFeed />
            <span>Feed</span>
          </li>
          <li className="flex items-center space-x-3">
            <BsChatLeftTextFill />
            <span>Chat</span>
          </li>
          <li className="flex items-center space-x-3">
            <MdPlayCircle />
            <span>Video</span>
          </li>
          <li className="flex items-center space-x-3">
            <MdGroup />
            <span>Group</span>
          </li>
          <li className="flex items-center space-x-3">
            <MdBookmark />
            <span>Bookmarks</span>
          </li>
          <li className="flex items-center space-x-3">
            <MdOutlineHelpOutline />
            <span>Questions</span>
          </li>
          <li className="flex items-center space-x-3">
            <MdWorkOutline />
            <span>Jobs</span>
          </li>
          <li className="flex items-center space-x-3">
            <MdEvent />
            <span>Events</span>
          </li>
          <li className="flex items-center space-x-3">
            <MdSchool />
            <span>Courses</span>
          </li>
        </ul>
        <button className="flex justify-center items-center bg-gray-200 w-[132px] mt-4">
          show more
        </button>
        <hr className="my-5 mx-0" />
        <ul className="flex flex-col space-y-2">
          {Users?.map((friend, index) => (
            <Friends key={index} friend={friend} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
