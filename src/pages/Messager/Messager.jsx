import Conversation from "components/Conversation/Conversation";
import Topbar from "components/Topbar/Topbar"
import { RiSearch2Line } from 'react-icons/ri';
import { IoIosSend} from 'react-icons/io';
import Message from 'components/Message/Message';
import ChatOnline from "components/ChatOnline/ChatOnline";


const Messager = () => {
  return (
    <>
    <Topbar/>
    <div className="messager h-[calc(100vh-70px)] flex w-[100%] space-x-2">
    <div className="chatMenu w-[25%] shadow-md">
    <div className="chatMenuWraper p-5 h-[100%]">
    <div className="flex flex-1 w-[80%] bg-white items-center  h-8 space-x-2 border-b-[1.2px] border-slate-300">
        <RiSearch2Line className="text-slate-500 text-2xl outline-none" />
        <input
          type="text"
          className="outline-none w-96 text-sm"
          placeholder="Search for friends"
        />
      </div>
      <Conversation/>
      <Conversation/>
      <Conversation/>
      <Conversation/>
      <Conversation/>
        </div> 
     </div>  
    <div className="chatBox w-[50%] shadow-md">
    <div className="chatBoxWrapper pt-5 pb-5 pl-5 pr-0  h-[100%] flex flex-col justify-between ">
        <div className="chatbotTop h-[100%] w-full overflow-y-scroll  pr-4">
            <Message/>
            <Message own={true}/>
            <Message/>
            <Message own={true}/>
            <Message/>
            <Message own={true}/>
            <Message/>
            <Message own={true}/>
            <Message/>
            <Message own={true}/>
            <Message/>
            <Message own={true}/>
            <Message/>
            <Message own={true}/>
            <Message/>
            <Message own={true}/>
            <Message/>
        </div>
        <div className="chatbotBottom flex space-x-2 mt-5 items-center">
            <textarea className="chatbotBottommessage border border-slate-600 p-2 rounded-md w-[80%]"   rows="2" placeholder="write something..."></textarea>
            <button className="bg-teal-500 text-white h-[48px] w-32  rounded-md outline-none flex items-center space-x-2 justify-center">
                <IoIosSend className="text-2xl font-thin"/>
                <span className="text-2xl font-thin">send</span>
                </button>    
        </div>
    </div>  
    </div>  
    <div className="chatOnline w-[25%] shadow-md">
    <div className="chatOnlineWrapper p-5 h-[100%]">
        <ChatOnline/>
        <ChatOnline/>
        <ChatOnline/>
        <ChatOnline/>
        <ChatOnline/>
    </div>  
    </div>  
    </div>  

    </>
    
  )
}

export default Messager