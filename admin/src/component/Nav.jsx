import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'

function Nav() {
  let navigate=useNavigate();
  let {serverUrl}=useContext(authDataContext)
  let{getAdmin}=useContext(authDataContext)
  const logOut=async()=>{
    try {
      const result=await axios.get(serverUrl + "/api/auth/logout",{withCredentials:true})
      console.log(result.data)
      getAdmin;
      navigate("/login")

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='fixed top-0 left-0 w-full h-[100px] bg-white z-50 flex items-center justify-between px-[30px] shadow-md'>
      <div className='w-[30%] flex items-center justify-start gap-[0px]'onClick={()=>{navigate("/")}}>
        <img src={logo} alt="" className='w-[100px] cursor-pointer'/>
        <h1 className='text-[30px] text-black font-serif cursor-pointer'>PrakritiSparsh</h1>
      </div>
      <button className='text-[15px] redius-[5px] rounded-full px-[10px] py-[5px] hover:border-[2px] cursor-pointer bg-[#F83EAD]' onClick={logOut}>Logout</button>
    </div>
  )
}

export default Nav