import React, { useState } from 'react'
import logo from '../assets/logo.png'
import google from '../assets/google.png'
import { useNavigate } from 'react-router-dom'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
function Registration() {
  let[show,setShow]=useState(false)
  let{serverUrl}=useContext(authDataContext)
  let{getCurrentUser}=useContext(userDataContext)
  let[name,setName]=useState("")
  let[email,setEmail]=useState("")
  let[password,setPassword]=useState("")
  let navigate=useNavigate()
  const handleSignup=async(e)=>{
    e.preventDefault()
    try {                                                                                                                        
      const result=await axios.post(`${serverUrl}/api/auth/registration`,{name,email,password},{withCredentials:true})
      console.log(result.data)
      getCurrentUser()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  const googleSignUp=async()=>{
    try {
      const response=await signInWithPopup(auth,provider)
      // console.log(response)
      let user=response.user
      let name=user.displayName;
      let email=user.email;
      const result=await axios.post(`${serverUrl}/api/auth/googleLogin`,{name,email},{withCredentials:true})
      console.log(result.data)
      getCurrentUser()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='min-h-screen w-full bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8] text-white flex flex-col items-center justify-start'>
      <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px]'>
        <img src={logo} alt="logo" className='w-[100px] h-[125px] mt-[20px]'/>
        <h1 className='text-[27px] font-serif'>PrakritiSparsh</h1>
      </div>
      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span className='text-[16px]'>Welcome to PrakritiSparsh, Place your Order</span>
      </div>
      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex  items-center justify-center'>
        <form className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]' action="" onSubmit={handleSignup}>
          <div className='w-[90%] h-[50px] bg-[#F83EAD] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleSignUp}>
              <img className='w-[15px]' src={google} alt="" />Registration with Google
          </div>
          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>OR<div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>
          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
               <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='UserName'required onChange={(e)=>setName(e.target.value)} value={name}/>

               <input type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email'required onChange={(e)=>setEmail(e.target.value)} value={email}/>  

               <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password'required onChange={(e)=>setPassword(e.target.value)} value={password}/>

               {!show &&<IoEyeOutline className='w-[20px] h-[20px] absolute cursor-pointer right-[5%] mt-[25px]' onClick={()=>setShow(prev=>!prev)}/>}

               {show &&<IoEye className='w-[20px] h-[20px] absolute cursor-pointer right-[5%] mt-[25px]' onClick={()=>setShow(prev=>!prev)}/>}

               <button className='w-[100%] h-[50px] bg-[#F83EAD] rounded-lg'>Create Account</button>

               <p className='flex gap-[10px]'>You have any Account? <span onClick={()=>navigate("/login")} className='text-[#5555f6cf] cursor-pointer font-semibold'>Login</span></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration   