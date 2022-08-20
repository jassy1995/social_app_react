
import {useGetUserById } from "api/chat-app/user"
const Conversation = ({conversation,currentUser}) => {
  const userId = conversation.members.find(m=>m !== currentUser._id);
  const {data,isLoading} = useGetUserById({id: userId}); 

  return (
    <div className='conversation flex items-center p-3  space-y-2  space-x-2 cursor-pointer hover:bg-[rgba(245,243,243)]'>
      {isLoading ? (<h2>loading...</h2>):(
      <>
       <img className='conversationImg w-10 h-10 object-cover rounded-full' src={data?.data?.profilePicture?data.data.profilePicture:"/assets/person/avartar.webp"} alt="Placeholder" />
        <span className="conversationName font-medium">{data?.data?.username}</span>
      </>
      )}
       
    </div>
  )
}

export default Conversation