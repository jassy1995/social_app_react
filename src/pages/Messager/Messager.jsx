import {useState,useEffect ,useRef} from 'react'
import Conversation from "components/Conversation/Conversation";
import Topbar from "components/Topbar/Topbar"
import { RiSearch2Line } from 'react-icons/ri';
import { IoIosSend} from 'react-icons/io';
import Message from 'components/Message/Message';
import ChatOnline from "components/ChatOnline/ChatOnline";
import useGlobalStore from "store/global";
import {useGetUserConversation} from "api/chat-app/user"
import {useScrollMessageContainer} from "Hooks/useScrollPosition";
import {io} from "socket.io-client"
import https from "lib/https";


 

const Messager = () => {
  const [currentChat,setCurrentChat] = useState(null)
  const [messages,setMessage] = useState([])
  const [newMessage,setNewMessage] = useState("")
  const [arrivalMessage,setArrivalMessage] = useState(null)
  const [onlineUsers,setOnlineUser] = useState([])
  const currentUser = useGlobalStore((state) => state.data.app_user);
  const {data:conversation,isLoading} = useGetUserConversation({id:currentUser?._id })
  const socket = useRef()
  const containerRef = useRef()

  useScrollMessageContainer(containerRef,messages)

  const handleCreateMessage=async(e)=>{
    e.preventDefault();
    const message = {
      sender: currentUser?._id,
      text:newMessage,
      conversationId:currentChat?._id,
    }
    const receiverId = currentChat?.members.find(member => member !== currentUser._id)
    socket.current.emit("sendMessage",{
      senderId:currentUser?._id,
      receiverId,
      text:newMessage
    })
    try {
      const {data} = await https.post("message/create", message);
      if(data){
        setMessage([...messages,data]);
      }
      setNewMessage('')
    } catch (error) {
      console.log(error?.message?error.message:error)
    }

  }

  useEffect(()=>{
   const getUsermessage=async()=>{
    try {
      const {data} = await https.get(`/message/${currentChat?._id }`);
      if(data){
        setMessage(data);
      }
    } catch (error) {
      console.log(error?.message?error.message:error)
    }
   }
   getUsermessage()
  },[currentChat?._id])




  
  useEffect(()=>{
    socket.current = io("ws://localhost:8900")
    socket.current.on('getMessage',(data)=>{
      setArrivalMessage({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now()
      })
    })
  },[])


  useEffect(()=>{
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
     setMessage((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage,currentChat?.members])


  useEffect(()=>{
    socket.current.emit('addUser',currentUser._id)
    socket.current.on('getUsers',(users)=>{
      setOnlineUser(currentUser.followings.filter((f)=>users.some((u)=>u.userId===f)))
     
    })
  },[currentUser])


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

      {
        isLoading?(<h2>loading conversation</h2>):
        (conversation?.data.map((c,i)=>(
          <div onClick={()=>setCurrentChat(c)} key={i}>
            <Conversation conversation={c} key={i} currentUser={currentUser}/>
          </div>
        )))
      }
        </div> 
     </div>  
    <div className="chatBox w-[50%] shadow-md">
    <div className="chatBoxWrapper pt-5 pb-5 pl-5 pr-0  h-[100%] flex flex-col justify-between relative">
      {currentChat? (
      <>
        <div className="chatbotTop h-[100%] w-full overflow-y-scroll  pr-4">
          {messages?.map((m,i)=>(
            <div ref={containerRef} key={i}>
              <Message message={m} own={m.sender=== currentUser._id} key={i}/>
            </div>
          ))}
        </div>
        <div className="chatbotBottom flex space-x-2 mt-5 items-center">
            <textarea value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} className="chatbotBottommessage border border-slate-600 p-2 rounded-md w-[80%]"   rows="1" placeholder="write something..."></textarea>
            <button onClick={handleCreateMessage} className="bg-teal-500 text-white h-[42px] w-32  rounded-md outline-none flex items-center space-x-2 justify-center">
                <IoIosSend className="text-2xl font-thin"/>
                <span className="text-2xl font-thin">send</span>
                </button>    
        </div>
      </>
      )
      : (<span className="absolute top-[30%] text-[50px] text-slate-300  italic">open a conversation to start a chat</span>)
      }
        
    </div>  
    </div>  
    <div className="chatOnline w-[25%] shadow-md">
    <div className="chatOnlineWrapper p-5 h-[100%]">
        <ChatOnline onlineUsers={onlineUsers}  setCurrentChat={setCurrentChat}/>
    </div>  
    </div>  
    </div>  

    </>
    
  )
}

export default Messager