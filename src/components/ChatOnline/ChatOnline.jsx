import React from 'react'

const ChatOnline = () => {
  return (
    <div className='chat-online'>
        <div className='chat-online-friends flex items-center cursor-pointer font-medium mt-2'>
            <div className='chat-online-container relative mr-[10px]'>
                <img src="/assets/person/4.jpeg" alt="person" className='h-10 w-10 rounded-full object-cover border-[1px solid white]'/>
                <div className="chat-bagde absolute top-[0px] right-[0px] w-3 h-3 rounded-full bg-green-400 "></div>
            </div>
            <span className="chat-online-name">John Doe</span>
        </div>

    </div>
  )
}

export default ChatOnline