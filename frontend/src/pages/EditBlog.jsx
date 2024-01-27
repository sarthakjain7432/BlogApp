import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ImCross} from "react-icons/im"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { URL } from "../url"

const EditBlog = () => {

    const blogId=useParams().id
    const {user}=useContext(UserContext)
    const navigate=useNavigate()

    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])

    const fetchPost=async()=>{
      try{
        const res=await axios.get(URL+"/api/blogs/"+blogId)
        setTitle(res.data.title)
        setDesc(res.data.desc)
        setFile(res.data.photo)
        setCategories(res.data.categories)
      }
      catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      fetchPost()
    },[blogId])

    const handleUpdate=async (e)=>{
      e.preventDefault()
      const blog={
        title,
        desc,
        username:user.username,
        userId:user._id,
        categories:categories
      }

      if(file){
        const data=new FormData()
        const filename=Date.now()+file.name
        data.append("img",filename)
        data.append("file",file)
        blog.photo=filename
        try{
          const imgUpload=await axios.post(URL+"/api/upload",data)
        }
        catch(err){
          console.log(err)
        }
      }
     
      try{
        const res=await axios.put(URL+"/api/blogs/"+blogId,blog,{withCredentials:true})
        navigate("/blogs/blog/"+res.data._id)
      }
      catch(err){
        console.log(err)
      }
    }

    const addCategory=()=>{
        let updatedCategories = [...categories]
        updatedCategories.push(category)
        setCategory("")
        setCategories(updatedCategories);
    }

    const deleteCategory=(index)=>{
        const updatedCategories = categories.filter((_, idx)=> idx != index) 
        setCategories(updatedCategories)
    }

    const handleSubmit = (event) => {
    event.preventDefault(); 
    };

  return (
    <div>
        <Navbar/>
        <div className='mt-8 px-6 md:px-[200px]'>
            <p className='text-xl md:text-2xl font-bold'>Update a blog</p>
            <form className='flex flex-col space-y-4 md:space-y-8 mt-4' onSubmit={handleSubmit}>
                <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter blog title' className='px-4 py-2 outline-none'/>
                <input onChange={(e)=>setFile(e.target.files[0])} type="file" className='px-4'/>
                <div>
                    <input value={category} onChange={(e)=>setCategory(e.target.value)} type="text" placeholder='Enter Category' className='px-4 py-2 outline-none space-x-4 md:space-x-8'/>
                    <button onClick={addCategory} className='bg-black text-white px-4 py-1 font-semibold'>Add</button>
                </div>
                <div className='flex px-4 mt-3'>
                    {categories.map((item,index)=>(
                        <div key={index} className='flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded-md mr-4'>
                            <p>{item}</p>
                            <p onClick={()=>deleteCategory(index)} className='bg-black text-white text-sm rounded-full cursor-pointer p-1'><ImCross/></p>
                        </div>
                        )
                    )}
                </div>
                <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} cols="30" rows="10" className='px-4 py-2 outline-none' placeholder='Enter Description'></textarea>
                <button onClick={handleUpdate} className='bg-black text-white py-1 w-full md:w-[20%] mx-auto font-semibold md:text-xl'>Update</button>
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default EditBlog