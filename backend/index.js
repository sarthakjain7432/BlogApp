const express = require("express")
const app = express()

const cors=require('cors')

const dotenv = require("dotenv")
const cookieParser=require('cookie-parser')
const multer=require('multer')
const path=require("path")

const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const blogRoute=require('./routes/blogs')
const commentRoute=require('./routes/comments')

dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/blogs",blogRoute)
app.use("/api/comments",commentRoute)

const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("image has been uploaded successfully")
})


const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("app connected to database");
    app.listen(5000,()=>{
        console.log(`app is listening to port: 5000`);
    })
})
.catch((err)=>{
    console.log(err);
})