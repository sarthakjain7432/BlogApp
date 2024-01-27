import React from 'react'
import Home from './pages/Home'
import {Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import BlogDetails from './pages/BlogDetails'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'
import Profile from './pages/Profile'
import {  UserContextProvider } from './context/UserContext'
import MyBlogs from './pages/MyBlogs'

const App = () => {
  return (
      <UserContextProvider>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/blogs/blog/:id' element={<BlogDetails/>}/>
          <Route exact path='/write' element={<CreateBlog/>}/>
          <Route exact path='/edit/:id' element={<EditBlog/>}/>
          <Route exact path="/myblogs/:id" element={<MyBlogs />} />
          <Route exact path='/profile/:id' element={<Profile/>}/>
        </Routes>
      </UserContextProvider>
  )
}

export default App