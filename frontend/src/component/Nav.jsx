import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { LuUser } from "react-icons/lu";
import { FaOpencart } from "react-icons/fa6";
import { userDataContext } from '../context/userContext';
import { BiSearchAlt } from "react-icons/bi";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { FcHome } from "react-icons/fc";
import { MdOutlineCollections } from "react-icons/md";
import { RiHeartAddLine } from "react-icons/ri";
import { FcAbout } from "react-icons/fc";
import { shopDataContext } from '../context/ShopContext';
function Nav() {
  let { userData } = useContext(userDataContext)
  let { getCurrentUser } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  let [showProfile, setShowProfile] = useState()
  let {search,setSearch,cartCount}=useContext(shopDataContext)
  let navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl +"/api/auth/logout", { withCredentials: true })
      console.log(result.data)
      getCurrentUser();
      navigate("login")
    } catch (error) {
      console.log(error)
    }
  }  
  return (
    <div className="fixed top-0 left-0 w-full h-[100px] bg-white z-50 flex items-center justify-between px-[30px] shadow-md">
      <div className='w-[30%] flex items-center justify-start'>
        <img src={logo} alt="" className='w-[90px] cursor-pointer' onClick={()=>navigate("/")}/>
        <h1 className='text-[30px] text-black font-serif cursor-pointer' onClick={()=>navigate("/")}>PrakritiSparsh</h1>
      </div>
      <div className='w-[40%] hidden md:flex'>
        <ul className='flex items-center justify-center gap-[19px]'>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#F83EAD] rounded-2xl py-[5px] px-[20px]' onClick={()=>navigate("/")}>HOME</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#F83EAD] rounded-2xl py-[5px] px-[20px]' onClick={()=>navigate("/collection")}>COLLECTIONS</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#F83EAD] rounded-2xl py-[5px] px-[20px]' onClick={()=>navigate("/about")}>ABOUT</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#F83EAD] rounded-2xl py-[5px] px-[20px]' onClick={()=>navigate("/contact")}>CONTACT</li>
        </ul>        
      </div>
      <div className='w-[30%] flex items-center justify-end gap-[20px]'>
        <div className="relative w-[60%]"onChange={(e)=>{setSearch(e.target.value)}}value={search} onClick={()=>navigate("/collection")}>
          <input type="text" className='w-full h-[40px] rounded-[5px] px-[40px] border border-black placeholder:text-black text-black text-[18px]' placeholder='Search Here' />
          <BiSearchAlt className="absolute left-[10px] top-[50%] transform -translate-y-1/2 text-black text-[20px]" />
        </div>                                                                  
        {!userData && <LuUser className='w-[28px] h-[28px] text-[#000000] cursor-pointer hidden md:block' onClick={() => setShowProfile(prev => !prev)} />}                                                               
        {userData && <div className='w-[30px] h-[30px] bg-[#F83EAD]  rounded-full items-center justify-center cursor-pointer hidden md:flex' onClick={() => setShowProfile(prev => !prev)}>{userData?.name.slice(0, 1)}</div>}
        <div className='relative cursor-pointer' onClick={() => navigate('/cart')}>
          <FaOpencart className='w-[30px] h-[30px] text-[#000000]' />
          <p className='absolute min-w-[18px] h-[18px] flex items-center justify-center bg-[#F83EAD] px-[4px] py-[2px] rounded-full text-[9px] top-[-6px] right-[-8px]'>{cartCount || 0}</p>
        </div>                                        
      </div>                                                                                           
      {showProfile && <div className='absolute w-[220px] h-[150px] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10'>
        <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px]'>                
          {!userData && <li className='w-[100%] hover:bg-[#D8B8BD] px-[15px] py-[10px]' onClick={() => {
            navigate("/login"); setShowProfile(false)
          }}>Login</li>}
          {userData && <li className='w-[100%] hover:bg-[#D8B8BD] px-[15px] py-[10px]' onClick={() => { handleLogout(); setShowProfile(false) }}>LogOut</li>}
          <li className='w-[100%] hover:bg-[#D8B8BD] px-[15px] py-[10px] ' onClick={()=>navigate("/order")}>Orders</li>
          <li className='w-[100%] hover:bg-[#D8B8BD] px-[15px] py-[10px]' onClick={()=>{navigate("/about"); setShowProfile(false)}}>About</li>
        </ul>
      </div>}
      <div className='w-full h-[90px] flex items-center justify-around fixed bottom-0 left-0 bg-white md:hidden'>
        <button className='flex items-center justify-center flex-col gap-[2px]'>
          <FcHome className='w-[28px] h-[28px] md-hidden' onClick={()=>navigate("/")}/>
          Home</button>
         <button className='flex items-center justify-center flex-col gap-[2px]'>
          <RiHeartAddLine className='w-[28px] h-[28px] md-hidden' onClick={()=>navigate("/collection")}/>
          Categories</button>
           <button className='flex items-center justify-center flex-col gap-[2px]'>
          <FcAbout className='w-[28px] h-[28px] md-hidden' onClick={()=>navigate("/about")}/>
          About</button>
            <button className='flex items-center justify-center flex-col gap-[2px]'>
           {!userData && <LuUser className='w-[28px] h-[28px] text-[#000000] cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />}
        {userData && <div className='w-[28px] h-[28px] bg-[#D8B8BD] rounded-full flex items-center justify-center cursor-pointer' onClick={() => setShowProfile(prev => !prev)}>{userData?.name.slice(0, 1)}</div>}
          Account</button>          
      </div>
    </div>
  )
}
export default Nav