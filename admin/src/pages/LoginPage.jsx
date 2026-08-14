import React, { useState } from 'react'
import logo from '../assets/logo.png'

import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  let [show, setShow] = useState(false)
  let [email, setemail] = useState("")
  let [password, setPassword] = useState("")
  let {serverUrl}=useContext(authDataContext)
  let {adminData, getAdmin}=useContext(adminDataContext)
  let navigete=useNavigate()
  const adminLogin = async (e) => {
    e.preventDefault()
    try {
     const result =await axios.post(serverUrl + '/api/auth/adminlogin',{email,password},{withCredentials:true})
     console.log(result.data)
     getAdmin()
     navigete("/")
    } catch (error) {
      console.log(error)
    }
  }
  
  
  return (
    <div className='min-h-screen w-full bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8] text-white flex flex-col items-center justify-start '>
      <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px]'>
        <img src={logo} alt="logo" className='w-[100px] h-[125px] mt-[20px]' />
        <h1 className='text-[27px] font-serif'>PrakritiSparsh</h1>
      </div>
      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Login Page</span>
        <span className='text-[16px]'>Welcome to PrakritiSparsh, Apply to Admin Login</span>
      </div>
      <div className='max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex  items-center justify-center'>
        <form onSubmit={adminLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]' action="">
        
          <div  className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative '>
            <input type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e) => setemail(e.target.value)} value={email} />
            <input type={show ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
            {!show && <IoEyeOutline className='w-[20px] h-[20px] absolute cursor-pointer right-[5%] ' onClick={() => setShow(prev => !prev)} />}
            {show && <IoEye className='w-[20px] h-[20px] absolute cursor-pointer right-[5%] ' onClick={() => setShow(prev => !prev)} />}
            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg cursor-pointer'>Login</button>
          
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
