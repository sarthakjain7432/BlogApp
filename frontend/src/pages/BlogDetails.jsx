import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {BiEdit} from "react-icons/bi"
import {MdDelete} from "react-icons/md"
import Comment from '../components/Comment'
import axios from "axios"
import { IF,URL } from "../url"
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from "../context/UserContext"
import Loader from "../components/Loader"

const BlogDetails = () => {
    const blogId=useParams().id
    const [blog,setBlog]=useState({})
    const {user}=useContext(UserContext)
    const [comments,setComments]=useState([])
    const [comment,setComment]=useState("")
    const [loader,setLoader]=useState(false)
    const navigate=useNavigate()

    const fetchBlog=async()=>{
    try{
      const res= await axios.get(URL+"/api/blogs/"+blogId)
      setBlog(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchBlog()
  },[blogId])

  const handleDeleteBlog=async ()=>{
    try{
      const res=await axios.delete(URL+"/api/blogs/"+blogId,{withCredentials:true})
      console.log(res.data)
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
  }

   const fetchBlogComments=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/comments/blog/"+blogId)
      setComments(res.data)
      setLoader(false)
    }
    catch(err){
      setLoader(true)
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchBlogComments() 
  },[blogId])

   const postComment=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post(URL+"/api/comments/create",
      {comment:comment,author:user.username,blogId:blogId,userId:user._id},
      {withCredentials:true})
      
      window.location.reload(true)

    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
        <Navbar/>
        {loader?
        <div className="h-[80vh] flex justify-center items-center w-full"><Loader/></div>:
        <div className='mt-8 px-8 md:px-[200px]'>
            <div className='flex justify-between'>
                <p className='text-2xl md:text-3xl font-bold text-black'>{blog.title}</p>
                {user?._id===blog?.userId && <div className='flex space-x-2 items-center'>
                    <BiEdit onClick={()=>navigate("/edit/"+blogId)} className="cursor-pointer"/>
                    <MdDelete onClick={handleDeleteBlog} className="cursor-pointer"/>
                </div>}
            </div>
            <div className='flex justify-between mt-2 md:mt-4'>
                <p>@{blog.username}</p>
                <div>
                    <span className='mr-2'>{new Date(blog.updatedAt).toString().slice(0,15)}</span>
                    <span>{new Date(blog.updatedAt).toString().slice(16,24)}</span>
                </div>
            </div>
            <img src={IF+blog.photo} alt="" className='w-full mt-8'/>
            <p className='mt-4'>{blog.desc}</p>
            <div className='flex space-x-4 mt-8 font-semibold items-center'>
                <p>Categories:</p>
                <div className='flex space-x-2 items-center'>
                    {blog.categories?.map((c,i)=>(                      
                        <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>                             
                    ))}
                </div>
            </div>
            <p className='mt-6 mb-4 font-semibold'>Comments:</p>
                {comments?.map((c)=>(
                    <Comment key={c._id} c={c} />
                ))}               
            <div className='flex flex-col md:flex-row'>
                <input onChange={(e)=>setComment(e.target.value)} type="text" placeholder='Write a comment' className='px-2 outline-none md:w-[85%] mt-2 md:mt-0'/>
                <button onClick={postComment} className='bg-black text-white py-1.5 md:w-[15%] mt-4 md:mt-0'>Add Comment</button>
            </div>
        </div>}
        <Footer/>
    </div>
  )
}

export default BlogDetails