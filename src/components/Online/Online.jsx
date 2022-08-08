import {useGetUserById} from "api/chat-app/user"



function Online({ userId}) {
 const {data:user,isLoading,isSuccess} = useGetUserById({id:userId})
  return (
    <li className="flex items-center mb-4">
      {
        isLoading ? (<h2>loading...</h2>):isSuccess && (
          <>
           <div className="relative mr-[10px]">
        <img
          src={user?.data?.profilePicture?user.profilePicture:"/assets/person/avartar.webp"}
          alt="not exist"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="rightbarOnline w-3 h-3 rounded-full bg-green-400 absolute top-[-2px] right-0 border border-white"></span>
      </div>
      <span className="rightbarUsername">{user?.data?.username}</span>
          </>
       
        
          )
        
      }
      
    </li>
  );
}

export default Online;
