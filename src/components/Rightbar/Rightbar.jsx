import {useState} from "react";
import { Users } from "dummyData";
import useGlobalStore from "store/global";
import {Link} from "react-router-dom"
import Online from "components/Online/Online";
import {useGetFriendQuery,useFollowMutation ,useUnFollowMutation } from "api/chat-app/user"
import {FaMinus} from "react-icons/fa"
import {AiOutlinePlus} from "react-icons/ai"

function Rightbar({ w ,userName,userId}) {
  const {data:friends,isLoading,isError,error} = useGetFriendQuery({userName});
   const { addFollower, removeFollower} = useGlobalStore((state) => ({
    addFollower: state.addFollower,
    removeFollower: state.removeFollower,
  }));
  const user = useGlobalStore((state) => state.data.app_user);
  const [followed,setFollowed] = useState(user?.followings?.includes(userId))
  const {  mutateAsync:followUser, } = useFollowMutation()
  const { mutateAsync:unFollowUser,  } = useUnFollowMutation()



  const handleClick = async() => {
    if(followed){
      await unFollowUser(userId);
      removeFollower(userId)
      const getUser =  localStorage.getItem("app_user")
      && JSON.parse(localStorage.getItem("app_user"));

      const newFollowings = getUser.followings.filter(x=>x._id !== userId)
      getUser['followings'] = newFollowings;
      localStorage.setItem(
        "app_user",
        JSON.stringify(getUser)
      );
      
    }else{
      await followUser(userId)
      addFollower(userId);
      const getUser =  localStorage.getItem("app_user")
      && JSON.parse(localStorage.getItem("app_user"));
      const newFollowings = [...getUser.followings,userId]
      getUser['followings'] = newFollowings;
      localStorage.setItem(
        "app_user",
        JSON.stringify(getUser)
      );
    }
    setFollowed(!followed)
  };
   
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthDayContainer flex space-x-2">
          <img
            src="/assets/gift.png"
            alt="not exist"
            className="w-10 h-10 object-cover"
          />
          <span>
            <b>John Doe</b> and <b>other 3 friends</b> have a birthday today
          </span>
        </div>
        <img
          src="/assets/ad.png"
          alt="not exist"
          className="w-[100%] mt-4 mb-0 rounded-md"
        />
        <h4 className="mb-3 mt-2 font-medium">Online Friends</h4>
        <ul>
          {Users?.map((user, index) => (
            <Online key={index} user={user} />
          ))}
        </ul>
      </>
    );
  };

  

  const ProfileRightBar = () => {
    return (
      <>
      {user.username !== userName && (
        <button className="bg-[#1872f2] text-white font-mono px-2 py-1 rounded-md" onClick={handleClick}>
          {!followed? (<span className="flex items-center space-x-2">follow <AiOutlinePlus className="ml-1"/></span>)
          :(<span className="flex items-center space-x-2">unfollow <FaMinus className="ml-1"/></span>)}
          
          
        </button>
      )}
        <h4 className="font-medium mb-1 text-lg mt-1">User Information</h4>
        <div className="rightBarInfo flex flex-col space-y-3">
          <div className="rightBarItem flex">
            <span className="text-sm font-medium text-slate-600">City:</span>
            <span className="text-sm ml-3 text-slate-500">New Yok</span>
          </div>
          <div className="rightBarItem flex">
            <span className="text-sm font-medium text-slate-600">From</span>
            <span className="text-sm ml-3 text-slate-500">Madrid</span>
          </div>
          <div className="rightBarItem flex">
            <span className="text-sm font-medium text-slate-600">
              Relationship
            </span>
            <span className="text-sm ml-3 text-slate-500">Single</span>
          </div>
        </div>
        <h4 className="my-2 mt-3 font-medium">User Friends</h4>
        <div className="followings flex flex-wrap gap-3">
          {isLoading?(<h1 className="text-center">loading...</h1>):!isLoading && !friends.data.length?(<h1 className="text-center">no friend</h1>):isError?<h1 className="text-center">{error.message}</h1>:(
            friends.data.map((friend,i)=>(
              <Link to={`/profile/${friend.username}`} key={i}>
             
              <div className="following flex flex-col justify-center items-center">
              <img
               src={friend?.profilePicture?friend.profilePicture:"/assets/person/avartar.webp"}
               alt=""
               className="h-20 w-20 rounded-md object-cover"
           />
           <span>{friend.username}</span>
         </div>
         </Link>
            ))
          
          )}
          
          {/* <div className="following flex flex-col justify-center items-center">
            <img
              src="/assets/person/4.jpeg"
              alt=""
              className="h-20 w-20 rounded-md object-cover"
            />
            <span>John Doe</span>
          </div>
          <div className="following flex flex-col justify-center items-center">
            <img
              src="/assets/person/3.jpeg"
              alt=""
              className="h-20 w-20 rounded-md object-cover"
            />
            <span>John Doe</span>
          </div>
          <div className="following flex flex-col justify-center items-center">
            <img
              src="/assets/person/1.jpeg"
              alt=""
              className="h-20 w-20 rounded-md object-cover"
            />
            <span>John Doe</span>
          </div>
          <div className="following flex flex-col justify-center items-center">
            <img
              src="/assets/person/1.jpeg"
              alt=""
              className="h-20 w-20 rounded-md object-cover"
            />
            <span>John Doe</span>
          </div>
          <div className="following flex flex-col justify-center items-center">
            <img
              src="/assets/person/5.jpeg"
              alt=""
              className="h-20 w-20 rounded-md object-cover"
            />
            <span>John Doe</span>
          </div>
          <div className="following flex flex-col justify-center items-center">
            <img
              src="/assets/person/7.jpeg"
              alt=""
              className="h-20 w-20 rounded-md object-cover"
            />
            <span>John Doe</span>
          </div>
          <div className="following flex flex-col justify-center items-center">
            <img
              src="/assets/person/6.jpeg"
              alt=""
              className="h-20 w-20 rounded-md object-cover"
            />
            <span>John Doe</span>
          </div> */}
        </div>
      </>
    );
  };
  return (
    <div className={!w ? "w-[25%]" : "w-[30%]"}>
      <div className="rightBarWrapper pt-7 pr-4">
        {!w ? <HomeRightBar /> : <ProfileRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;
