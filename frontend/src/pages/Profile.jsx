import { useContext, useEffect, useState } from "react"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfileBlogs from '../components/ProfileBlogs'
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"

const Profile = () => {
    const param = useParams().id
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [updated, setUpdated] = useState(false)

    const fetchProfile = async () => {
        try {
            const res = await axios.get(URL + "/api/users/" + user._id)
            setUsername(res.data.username)
            setEmail(res.data.email)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleUserUpdate = async () => {
        setUpdated(false)
        try {
            const res = await axios.put(URL + "/api/users/" + user._id, { username, email}, { withCredentials: true })
            setUpdated(true)
        }
        catch (err) {
            console.log(err)
            setUpdated(false)
        }
    }

    const handleUserDelete = async () => {
        try {
            const res = await axios.delete(URL + "/api/users/" + user._id, { withCredentials: true })
            setUser(null)
            navigate("/")
        }
        catch (err) {
            console.log(err)
        }
    }

    const fetchUserBlogs = async () => {
        try {
            const res = await axios.get(URL + "/api/blogs/user/" + user._id)
            setBlogs(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [param])

    useEffect(() => {
        fetchUserBlogs()
    }, [param])

    return (
        <div>
            <Navbar />
            <div className='px-8 md:px-[200px] mt-8 flex flex-col-reverse md:flex-row'>
                <div className='md:w-[70%] w-full'>
                    <p className='text-xl font-bold mb-4 mt-8 md:mt-0'>Your Blogs:</p>
                    {blogs?.map((p) => (
                        <ProfileBlogs key={p._id} p={p} />
                    ))}
                </div>

                <div className='md:sticky md:top-16 flex flex-col w-full md:w-[30%] space-y-4 md:translate-x-36'>
                    <p className='text-xl font-bold mb-4'>Profile</p>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} className='px-4 py-2 text-gray-500 outline-none' type="text" placeholder='Your username' />
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='px-4 py-2 text-gray-500 outline-none' type="email" placeholder='Your email' />
                    <div className='flex items-center space-x-4'>
                        <button onClick={handleUserUpdate} className='px-4 py-2 bg-black text-white font-semibold hover:text-black hover:bg-gray-400'>Update</button>
                        <button onClick={handleUserDelete} className='px-4 py-2 bg-black text-white font-semibold hover:text-black hover:bg-gray-400'>Delete</button>
                    </div>
                    {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile