import React, { useState,useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Menu from './Menu';
import { UserContext } from "../context/UserContext"

const Navbar = () => {
  const [prompt,setPrompt]=useState("")
  const [menu, setMenu] = useState(false)

  const navigate=useNavigate()
  const path=useLocation().pathname

  const showMenu=()=>{
    setMenu(!menu)
  }

  const {user}=useContext(UserContext)

  return (
    <div className='flex justify-between items-center px-6 md:px-[200px] py-4'>
      <p className='text-lg md:text-3xl font-bold'><Link to="/">Blogorama</Link></p>
      {path==="/" && <div className='flex items-center border-slate-400'>
      <IoSearchSharp className='cursor-pointer' onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))}/>
      <input onChange={(e)=>setPrompt(e.target.value)} type="text" placeholder='search a post' className='px-2 outline-none'/>
      </div>}
      {user ? (
        <div className='flex items-center space-x-2 md:space-x-4'>
          <Link to="/write">Write</Link>
          <div onClick={showMenu}>
            <RxHamburgerMenu className='text-xl cursor-pointer'/>
            {menu && <Menu/>}
          </div>
        </div>
      ):(
        <div>
          <div className='hidden md:block space-x-2 md:space-x-4'>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          <div className='md:hidden' onClick={showMenu}>
            <RxHamburgerMenu className='text-xl cursor-pointer'/>
            {menu && <Menu/>}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar