import React from 'react'

const Message = ({own}) => {
  return (
    <div className={`message flex flex-col mt-3 ${own?'items-end':''}`}>
        <div className="messageTop flex space-x-2">
            <img src="/assets/person/6.jpeg" alt="person" className='w-8 h-8 object-cover rounded-full'/>
            <p className={`p-3 text-sm rounded-[30px]  text-white max-w-[300px] ${own?'bg-[rgb(245,241,241)] text-black':'bg-[#1877f2]'}`}>You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers reduced motion, and more.</p>
        </div>
        <div className="messageBottom text-[12px] mt-[10px]">
            1 hour ago
        </div>
    </div>
  )
}

export default Message