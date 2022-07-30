import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import { BsFillPersonFill, BsFillChatRightTextFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate ,Link,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useGlobalStore from 'store/global'

function Topbar() {
  const { app_user,SIGNOUT} = useGlobalStore((state) => ({
    app_user: state.data.app_user,
    SIGNOUT: state.SIGNOUT,
  }));

  const location=useLocation()

let navigate = useNavigate()
  const logout=()=>{
    SIGNOUT();
    localStorage.removeItem("app_user");
    toast.success("successfully logged out");
    navigate("/login");
  }
  return (
    <div className="flex items-center h-[50px] bg-[#1877f2] w-[100%] sticky top-0 px-6 space-x-3 z-20">
      <div className="flex flex-1 w-[50%] font-medium text-xl text-white bg-myColor-transparent rounded-full md:capitalize md:first-letter:font-medium first-letter:text-2xl  md:first-letter:text-4xl first-letter:font-bold ml-[42px]">
        {location.pathname==="/messager"? (<Link to="/">Home</Link>):(<Link to="/messager">Messager</Link>)}
   
        
      </div>

      <div className="flex flex-1 w-[30%] bg-white items-center px-4 h-8 rounded-full space-x-2">
        <RiSearch2Line className="text-slate-500" />
        <input
          type="text"
          className=" outline-none w-96"
          placeholder="Search here"
        />
      </div>
      <div className="flex flex-1 w-[50%] items-center  justify-around">
        <div className="flex space-x-3 text-white pt-1 cursor-pointer">
          <span>Home</span>
          <span>Timeline</span>
        </div>
        <div className="flex justify-between items-center space-x-6">
          <div className="flex pt-3 cursor-pointer relative">
            <BsFillPersonFill className="text-white text-xl" />
            <sup className="flex bg-red-500 h-3 w-3 rounded-full text-white font-bold mt-1 justify-center items-center absolute  left-3 top-0 pb-[1px]">
              2
            </sup>
          </div>
          <div className="flex pt-3 cursor-pointer relative">
            <BsFillChatRightTextFill className="text-white text-xl" />
            <sup className="flex bg-red-500 h-3 w-3 rounded-full text-white font-bold mt-1 justify-center items-center absolute  left-5 top-0 pb-[1px]">
              1
            </sup>
          </div>
          <div className="flex pt-3 cursor-pointer relative">
            <IoIosNotifications className="text-white text-xl" />
            <sup className="flex bg-red-500 h-3 w-3 rounded-full text-white font-bold mt-1 justify-center items-center absolute  left-3 top-0 pb-[1px]">
              4
            </sup>
          </div>
        </div>
        {app_user &&  
          <button onClick={logout} className="bg-myColor text-white px-3 py-2 rounded-md text-sm font-medium  ring-1 ring-myColor hover:bg-myColor hover:text-slate-200">logout</button>}
           {!app_user &&  
        <Link to="/register"><button className="bg-myColor text-white px-3 py-2 rounded-md text-sm font-medium  ring-1 ring-myColor hover:bg-myColor hover:text-slate-200">register</button></Link>}  
        <Link to={`/profile/${app_user.username}`}>
        <img
          src={app_user?.profilePicture? app_user.profilePicture: "/assets/person/avartar.webp"}
          alt=""
          className="w-10 h-10 rounded-full cursor-pointer object-cover"
        />
        </Link>          
        
      </div>
    </div>
  );
}

export default Topbar;
