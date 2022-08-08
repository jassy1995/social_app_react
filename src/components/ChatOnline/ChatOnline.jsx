
import { useState,useEffect } from 'react';
import {useGetFriendQuery } from "api/chat-app/user"
import useGlobalStore from "store/global";
import https from "lib/https";

const ChatOnline = ({onlineUsers,setCurrentChat}) => {
  const currentUser = useGlobalStore((state) => state.data.app_user);
  const {data:friends,isLoading} = useGetFriendQuery({userName:currentUser?.username})
  const [onlineFriends,setOnlineFriends] = useState([])

useEffect(()=>{
   setOnlineFriends(friends?.data?.filter((f)=>onlineUsers.includes(f?._id)))
},[friends?.data,onlineUsers])

const handleClick=async(user)=>{
  try {
    const {data} = await https.get(`conversation/find/${currentUser?._id}/${user?._id}`);
    setCurrentChat(data)
  } catch (error) {
    console.log(error?.message?error.message:error)
  }
}

  return (
    <div className='chat-online'>
      {isLoading?(<h2>loading</h2>):!isLoading && !onlineFriends?.length ?(<h2>no online friend</h2>):(
       friends.data.map((friend,i)=>(
        <div key={i} className='chat-online-friends flex items-center cursor-pointer font-medium mt-2' onClick={()=>handleClick(friend)}>
        <div className='chat-online-container relative mr-[10px]'>
            <img src={friend?.profilePicture?friend.profilePicture:"assets/person/avartar.webp"} alt="person" className='h-10 w-10 rounded-full object-cover border-[1px solid white]'/>
            <div className="chat-bagde absolute top-[0px] right-[0px] w-3 h-3 rounded-full bg-green-400 "></div>
        </div>
        <span className="chat-online-name">{friend?.username}</span>
    </div>
       ))
      )}
       

    </div>
  )
}

export default ChatOnline