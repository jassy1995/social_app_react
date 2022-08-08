import { useState ,useEffect} from "react";
import { MdMoreVert } from "react-icons/md";
import useGlobalStore from "store/global"
import {useLikeDisLikeMutation} from "api/chat-app/post";
import { timeFormatter } from "helper/timeFormatter";
import "./Post.css";



function Post({ post }) {
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLike] = useState(false);
  const user = useGlobalStore((state) => state.data.app_user);
  const {mutateAsync:updateLike} = useLikeDisLikeMutation()

  useEffect(() => {
    setIsLike(post.likes?.includes(user._id));
  },[post.likes,user._id]);

  const handleLike = async() => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLike(!isLiked);
    try {
      await updateLike(post._id)
    } catch (error) {
      console.log(error.message)
    }
  };
  return (
    <div className="post w-[100%] rounded-md my-10 mx-0">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={post?.userId?.profilePicture?post.userId.profilePicture:"/assets/person/avartar.webp"}
              alt="mot exist"
              className="w-8 h-8 rounded-full cursor-pointer object-cover"
            />
            <span className="">
              {post?.userId?.username}
            </span>
            <div className="text-slate-400 text-sm"><span className="border-r- border-slate-600 pr-1">
                        {
                          post?.createdAt?.split(
                            "T"
                          )[0]
                        }
                      </span>{" "}
                      <span className="pl-1 font-mono font-bold">
                        {post?.createdAt &&
                          timeFormatter(
                            new Date(
                              post.createdAt?.split(".")[0]?.replace("T"," ")
                            )
                          )}
                      </span></div>
          </div>
          <div>
            <MdMoreVert />
          </div>
        </div>
        <div className="my-5 mx-0">
          <span>{post?.desc}</span>
          <img
            src={post?.img}
            alt="not exist"
            className="mt-5 w-[100%] max-h-[500px] object-cover"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src="/assets/like.png"
              alt=""
              className="h-5 w-5"
              onClick={handleLike}
            />
            <img
              src="/assets/heart.png"
              alt=""
              className="h-5 w-5"
              onClick={handleLike}
            />
            <div>
              <span className="font-mono font-bold text-lg mr-1">{like}</span>
              People like it
            </div>
          </div>
          <div className="postBottomRight">
            <span className="border-b-2 border-dashed  text-md">
              {post?.comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
