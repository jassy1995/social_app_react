import { Fragment } from "react";
import {useParams} from "react-router-dom"
import TopBar from "components/Topbar/Topbar";
import RightBar from "components/Rightbar/Rightbar";
import Sidebar from "components/Sidebar/Sidebar";
import Feed from "components/Feed/Feed";
import useGlobalStore from "store/global";
import {useGetUser} from "api/chat-app/user"
export default function Profile() {
  const {username} = useParams()
  const user = useGlobalStore((state) => state.data.app_user);
  const {data,isLoading} = useGetUser({username})
 
  
  return (
    <>
      <TopBar />
      <div className="profile flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          {isLoading ? (<h2>Loading...</h2>):(
            <div className="pl-10">
            <div className="profileRightTop">
              <div className="profileCover h-[320px] relative">
                <img
                  className="profileCoverImg h-[250px] w-[100%] object-cover"
                  src={data?.data?.coverPicture?data?.data.coverPicture:"/assets/post/3.jpeg"}
                  alt="not exist"
                />
                <img
                  className="profiledImg w-[150px] h-[150px] rounded-full object-cover absolute left-0 right-0 mx-auto top-[150px] border border-white"
                  src={data?.data?.profilePicture? data?.data.profilePicture:"/assets/person/avartar.webp"}
                  alt="not exist"
                />
              </div>
              <div className="profileInfo flex flex-col justify-center items-center">
                <h4 className="profileInfoName text-xl">{data?.data?.username}</h4>
                <span className="profileDesc text-slate-500">description</span>
              </div>
            </div>
          </div>
          )}
          <div className="flex justify-between  w-[100%]">
             <Feed w="70%" isCurrentUser={user?.username===username?'yes':'no'} username={username}/>
            <RightBar w="30%" userName={username} userId={data?.data?._id}/>
          </div>
        </div>
      </div>
    </>
  );
}
