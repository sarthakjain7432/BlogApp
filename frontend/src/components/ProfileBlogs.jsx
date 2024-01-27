import React from 'react'
import { IF } from '../url'

const ProfileBlogs = ({ p }) => {
  return (
    <div className='flex space-x-6 mt-8 w-full justify-center'>
      <img src={IF + p.photo} alt="" className='w-[35%] h-[200px]' />
      <div className='w-[65%] flex flex-col'>
        <p className='text-xl md:text-2xl font-bold mb-1 md:mb-2'>{p.title}</p>
        <div className='flex justify-between text-sm text-gray-500 font-semibold'>
          <p>@{p.username}</p>
          <div>
            <span className='mr-2'>{new Date(p.updatedAt).toString().slice(0, 15)}</span>
            <span>{new Date(p.updatedAt).toString().slice(16, 24)}</span>
          </div>
        </div>
        <p className='mt-2 md:mt-4 text-sm md:text-lg'>{p.desc}</p>
      </div>
    </div>
  )
}

export default ProfileBlogs