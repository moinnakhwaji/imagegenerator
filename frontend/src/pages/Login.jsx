import React, { useState, useContext, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Usercontext } from '../context/Usecontext'


const Login = () => {
  const { setUser } = useContext(Usercontext)
  const [data,setdata] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setdata({...data,[e.target.name]: e.target.value})
}
const handelSubmit = async (e)=>{
  e.preventDefault()

try {
  const response = await axios.post('http://localhost:3000/api/login',data,{withCredentials:true})
  if(response){
    // console.log(response.data)
    localStorage.setItem('token',response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user)); 
console.log(response.data.user)
    setUser(response.data.user)
    
}
navigate('/')
  
} catch (error) {
  console.log(error.message)

  
}
  
}
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#141414] p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-50 text-center">Login</h2>
        <form onSubmit={handelSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-400 text-md mb-2">Email</label>
            <input 
            name="email" 
            onChange={handleChange}
            value={data.email}
              type="email" 
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#141414] rounded-lg text-gray-50 focus:outline-none focus:border-[#0a0a0a]" 
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-md mb-2">Password</label>
            <input 
            onChange={handleChange}
            name="password" 
              value={data.password}
              type="password" 
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#141414] rounded-lg text-gray-50 focus:outline-none focus:border-[#0a0a0a]" 
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-white hover:bg-gray-100  text-black font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-gray-300 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login