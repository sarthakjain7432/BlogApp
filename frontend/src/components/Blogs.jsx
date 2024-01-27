import React from 'react'
import { IF } from '../url'
const Blogs = ({ blog }) => {
  return (
    <div className='flex space-x-6 mt-8 w-full '>
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IF + blog.photo} alt="" className="h-full w-full object-cover" />
      </div>
      <div className='flex flex-col w-[65%]'>
        <p className='text-xl md:text-2xl font-bold mb-1 md:mb-2'>{blog.title}</p>
        <div className='flex justify-between text-sm text-gray-500 font-semibold'>
          <p>@{blog.username}</p>
          <div>
            <span className='mr-2'>{new Date(blog.updatedAt).toString().slice(0, 15)}</span>
            <span>{new Date(blog.updatedAt).toString().slice(16, 24)}</span>
          </div>
        </div>
        <p className='mt-2 md:mt-4 text-sm md:text-lg'>{blog.desc.slice(0, 200) + " ...Read more"}</p>
      </div>
    </div>
  )
}

export default Blogs