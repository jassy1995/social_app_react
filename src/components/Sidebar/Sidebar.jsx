import React,{useRef} from "react";
import {useScrollMessageContainer} from "Hooks/useScrollPosition";
import useGlobalStore from "store/global";
import {Link} from "react-router-dom";
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
import "./Sidebar.css";
import Friends from "components/Friends/Friends";
import { useGetUsers,useCreateConversion } from 'api/chat-app/user';







function Sidebar() {
  const containerRef = useRef()
  const user = useGlobalStore((state) => state.data.app_user);
  const {mutateAsync:createConversation} = useCreateConversion();
  

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetUsers();
  useScrollMessageContainer(containerRef,data?.pages);

  const createNewConversation=async(id)=>{
    await createConversation({senderId:user?._id,receiverId:id})
  }

  
  return (
    <div className="w-[20%] h-[calc(100vh-50px)] overflow-y-scroll sticky top-50" ref={containerRef}>
      <div className="p-7">
        <ul className="flex-col space-y-4">
          <li className="flex items-center space-x-3">
            <MdRssFeed />
            <span>Feed</span>
          </li>
          <Link to='/messager' className="flex items-center space-x-3">
          <li className="flex items-center space-x-3">
            <BsChatLeftTextFill />
            <span>Chat Now</span>
          </li>
          </Link>
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
        <hr className="my-5 mx-0" />
        <ul className="flex flex-col space-y-2">
          {isLoading ? (
        <h2>loading...</h2>
        ) : isError ? (
          <h2>{error.message}</h2> 
        ) : isFetching && !isFetchingNextPage ? (
          <h2>fetching...</h2>
        ) : (
          <>
            {data?.pages?.map((group, i) => {
              return (
                <div key={i} className="mb-3">
                  {!group?.data?.users?.length? (<h2>no user</h2>): (group?.data.users.map((friend, i) => (
                    <Link to={`/profile/${friend.username}`} key={i} onClick={() =>createNewConversation(friend._id)}>
                      <Friends friend={friend} key={i} />
                    </Link>
                  )))}
                </div>
              );
            })}
          </>
        )}

{
      hasNextPage && (
        <button
        className="flex justify-center items-center bg-gray-200 w-[132px] h-10 mt-4"
        onClick={fetchNextPage}
        disabled={!hasNextPage}
      >
         show more
      </button>
      )
      
      }

      {isFetchingNextPage && <h2>loading... more user</h2>}
    
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
