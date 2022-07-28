import React from 'react'

const Conversation = () => {
  return (
    <div className='conversation flex items-center p-3  space-y-2  space-x-2 cursor-pointer hover:bg-[rgba(245,243,243)]'>
        <img className='conversationImg w-10 h-10 object-cover rounded-full' src="assets/person/9.jpeg" alt="Placeholder" />
        <span className="conversationName font-medium">John Doe</span>
    </div>
  )
}

export default Conversation