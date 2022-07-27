import {useLocation} from 'react-router-dom'
import Post from "components/Post/Post";
import Share from "components/Share/Share";

// import { Posts } from "dummyData";
import { useGetPosts } from "api/chat-app/post";
import useGlobalStore from "store/global";
import Loader from "components/Loader";



function Feed({ w ,isCurrentUser,username}) {
  const location = useLocation()
  const user = useGlobalStore((state) => state.data.app_user);
  const {
    data,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPosts({username:username|| user.username});
   const EmptyProfilePost=({message})=>{
    return (
      <div className="flex flex-col items-center justify-center m-h-[100vh] mt-[50px]">
          <h1 className="text-xl font-medium text-slate-500 mt-24">{message}</h1>
  </div>
    )
   }
  return (
    <div className={!w ? "w-[55%]" : "w-[70%]"}>
      <div className="p-10 text-center">
        {isCurrentUser===undefined &&  <Share />}
        {isCurrentUser==='yes' && isCurrentUser !== undefined &&  <Share />}
        {isLoading ? (
        <Loader loading='loading' message='fetching post' />
        ) : isError ? (
          <Loader error="error" message={error.message} refetch={refetch} />
        ) : isFetching && !isFetchingNextPage ? (
          <Loader loading='loading' message='fetching post'  />
        ) : (
          <>
            {data?.pages?.map((group, i) => {
              return (
                <div key={i}>
                  {!group?.data?.posts?.length? (location.pathname.startsWith("/profile")?<EmptyProfilePost  message='You have no post'/>:<Loader empty='empty' message='You have no post'/>): (group?.data.posts.map((post, i) => (
                    <Post post={post} key={i} />
                  )))}
                </div>
              );
            })}
          </>
        )}
      {
      hasNextPage && (
        <button
        className="px-2 py-1 mt-4  ring-2 rounded-md w-32 font-bold font-[monospace]  text-blue-500 text-xl disabled:bg-slate-300 disabled:cursor-not-allowed self-center"
        onClick={fetchNextPage}
        disabled={!hasNextPage}
      >
        load more
      </button>
      )
      
      }
    
      </div>

    
    </div>
  );
}

export default Feed;
