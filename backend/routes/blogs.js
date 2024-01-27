const express=require('express')
const router=express.Router()
const Blog=require('../models/Blog')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')

//CREATE
router.post("/create",verifyToken,async (req,res)=>{
    try{
        const newBlog=new Blog(req.body)
        const savedBlog=await newBlog.save()
        res.status(200).json(savedBlog)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
        const updatedBlog=await Blog.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedBlog)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await Blog.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({blogId:req.params.id})
        res.status(200).json("Blog has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET BLOG DETAILS
router.get("/:id",async (req,res)=>{
    try{
        const blog=await Blog.findById(req.params.id)
        res.status(200).json(blog)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET BLOGS
router.get("/",async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const blogs=await Blog.find(query.search?searchFilter:null)
        res.status(200).json(blogs)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET USER BLOGS
router.get("/user/:userId",async (req,res)=>{
    try{
        const blogs=await Blog.find({userId:req.params.userId})
        res.status(200).json(blogs)
    }
    catch(err){
        res.status(500).json(err)
    }
})



module.exports=router