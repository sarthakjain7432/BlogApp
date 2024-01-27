import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {URL} from '../url'

const Register = () => {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const navigate=useNavigate()

  const handleRegister=()=>{ 
    
    axios.post(URL+"/api/auth/register",{username,email,password})
    // setUsername(res.data.username)
    // setEmail(res.data.email)
    // setPassword(res.data.password)
    .then(()=>{
      setError(false)
      navigate("/login")      
    })
  
    .catch((err)=>{
      setError(true)
      console.log(err)
    })
    
  }

  return (
    <>
    <div className='flex justify-between items-center px-6 md:px-[200px] py-4'>
      <p className='text-lg md:text-3xl font-bold'>Blogorama</p>
      <Link to="/login">Login</Link>
    </div>
    <div className='flex flex-col items-center space-y-4 mt-28 mb-28'>
        <p className='font-bold'>Create an account</p>
        <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='Enter your username' className='w-72 py-1 px-2 border-2 border-black'/>
        <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter your email' className='w-72 py-1 px-2 border-2 border-black'/>
        <input onChange={(e)=>setPassword(e.target.value)} type="text" placeholder='Enter your password' className='w-72 py-1 px-2 border-2 border-black'/>
        <button onClick={handleRegister} className='w-72 bg-black text-white py-2 rounded-lg font-bold hover:bg-gray-500 hover:text-black'>Register</button>
        {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
        <div>
            <span className='mr-2'>Already have an account?</span>
            <Link to="/login" className='text-gray-500 hover:text-black'>Login</Link>
        </div>
    </div>
    <div className='mt-8 px-8 md:px-[300px] py-8 flex flex-col md:flex-row justify-between bg-black text-white space-y-6 md:space-y-0 text-sm md:text-md'>
      <div>
        <p>Featured Blogs</p>
        <p>Most viewed</p>
      </div>
      <div>
         <p>Forum</p>
         <p>Support</p>
      </div>
      <div>
         <p>Privacy Policy</p>
         <p>About Us</p>
      </div>
    </div>
    </>
  )
}

export default Register