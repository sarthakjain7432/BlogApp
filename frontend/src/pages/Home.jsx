import React, { useContext, useEffect, useState } from 'react'
import Blogs from '../components/Blogs'
import Navbar from '../components/Navbar'
import Footer from "../components/Footer"
import { URL } from '../url'
import { UserContext } from "../context/UserContext"
import { Link, useLocation } from "react-router-dom"
import Loader from '../components/Loader'
import axios from "axios"

const Home = () => {
  const {search}=useLocation()
  const [blogs,setBlogs]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/blogs/"+search)
      setBlogs(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()
  },[search])

  return (
    <div>
    <Navbar/>
    <div className="px-8 md:px-[200px] min-h-[80vh]">
      {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        blogs.map((blog)=>(
          <>
          <Link to={user?`/blogs/blog/${blog._id}`:"/login"}>
          <Blogs key={blog._id} blog={blog}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No blogs available</h3>}
    </div>
    <Footer/>
    </div>
  )
}

export default Home