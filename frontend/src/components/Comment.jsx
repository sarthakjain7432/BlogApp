import axios from "axios"
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Comment = ({c}) => {
  const {user}=useContext(UserContext)
  const deleteComment=async(id)=>{
    try{
      await axios.delete(URL+"/api/comments/"+id,{withCredentials:true})
      window.location.reload(true)
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className='bg-gray-200 rounded-lg px-2 py-1 mb-4'>
        <div className='flex justify-between'>
            <p className='font-bold text-gray-600'>@{c.author}</p>
            <div className='flex space-x-4 items-center'>
                <p className='text-gray-500 text-sm'>{new Date(c.updatedAt).toString().slice(0,15)}</p>
                <p className='text-gray-500 text-sm'>{new Date(c.updatedAt).toString().slice(16,24)}</p>
                {user?._id===c?.userId ? 
                  <div onClick={()=>deleteComment(c._id)} className='flex space-x-2 items-center cursor-pointer'>
                      <MdDelete/>
                  </div>
                :""}
            </div>
        </div>
        <p className='px-4'>{c.comment}</p>
    </div>
  )
}

export default Comment