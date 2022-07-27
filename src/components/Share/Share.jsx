import {useRef,useState} from "react";
import { MdCancel, MdEmojiEmotions, MdLabel, MdPermMedia, MdRoom } from "react-icons/md";
import { toast } from "react-toastify"
import useGlobalStore from "store/global"
import {useCreatePostMutation} from "api/chat-app/post"
import "./Share.css";

const Share = () => {
  const user = useGlobalStore((state) => state.data.app_user);
  const {mutateAsync:createPost,isLoading} = useCreatePostMutation()
  const desc = useRef();
  const [file,setFile]= useState(null)

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const newPost = new FormData();
      newPost.append('desc',desc.current.value)
      newPost.append('postImg',file)
    
    try {
      await createPost(newPost);
      toast.success("posted successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message)
    }
  }
  return (
    <div className="share w-[100%]  rounded-md mt-0">
      <div className="p-4">
        <div className="flex items-center space-x-3 ">
          <img
            src={user?.profilePicture?user.profilePicture:"/assets/person/avartar.webp"}
            alt=""
            className="w-8 h-8 rounded-full cursor-pointer object-cover"
          />
          <input
            type="text"
            className="w-96 focus:outline-none"
            placeholder={`what's in your mind ${user?.username} ?`}
            ref={desc}
          />
        </div>
        <hr className="m-4" />
        {file && (
          <div className="shareImgContainer pt-0 pr-[20px] pb-[10px] pl-[20px] relative mx-auto text-center flex justify-center">
            <img  src={URL.createObjectURL(file)} alt="" className="shareImg w-[88%] object-cover" />
            <MdCancel className="shareCancel text-red-500 absolute top-0 right-[64px] cursor-pointer text-2xl" onClick={()=>setFile(null)}/>
          </div>
        )}
        <form className="flex justify-between" onSubmit={handleSubmit}>
          <div className="shareOptions flex space-x-6 ml-4">
            <label htmlFor="file" className="shareOption flex items-center space-x-[2px] cursor-pointer">
              <MdPermMedia className="text-red-400" />
              <span className="font-bold text-sm">photo or video</span>
              <input className="hidden" type="file" id="file" accept=".png,.webp,.jpg,.jpeg,.gif,.jfjf" onChange={(e)=>setFile(e.target.files[0])} />
            </label>
            <div className="shareOption flex items-center space-x-[2px]">
              <MdLabel className="text-blue-400" />
              <span className="font-bold text-sm">Tag</span>
            </div>
            <div className="shareOption flex items-center space-x-[2px]">
              <MdRoom className="text-green-400" />
              <span className="font-bold text-sm">Location</span>
            </div>
            <div className="shareOption flex items-center space-x-[2px]">
              <MdEmojiEmotions className="text-yellow-400" />
              <span className="font-bold text-sm">Feelings</span>
            </div>
          </div>
          <button type="submit" className="flex justify-center items-center rounded text-sm bg-green-500 font-bold text-white mr-4 w-[80px] pb-1 mt-2">
           {isLoading?'Sharing...':'Share'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
