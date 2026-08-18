import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Nav() {
  const navigate = useNavigate()
  const { serverUrl, getAdmin } = useContext(authDataContext)

  const logOut = async () => {
    try {
      const result = await axios.get(
        serverUrl + '/api/auth/logout',
        { withCredentials: true }
      )

      console.log(result.data)

      getAdmin

      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-[80px] bg-white/95 backdrop-blur-md z-50 flex items-center justify-between px-5 sm:px-8 lg:px-12 shadow-sm border-b border-gray-100">

      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => navigate('/')}
      >
        <img
          src={logo}
          alt="PrakritiSparsh Logo"
          className="w-[65px] sm:w-[75px] object-contain transition-transform duration-300 hover:scale-105"
        />

        <h1 className="text-xl sm:text-2xl lg:text-[28px] font-serif font-semibold text-gray-800 tracking-wide">
          PrakritiSparsh
        </h1>
      </div>

      <button
        onClick={logOut}
        className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full
        bg-[#F83EAD] text-white text-sm sm:text-base font-medium
        shadow-sm hover:bg-[#e52f99]
        hover:shadow-md hover:scale-105
        active:scale-95
        transition-all duration-200 cursor-pointer"
      >
        <span>Logout</span>
      </button>

    </nav>
  )
}

export default Nav
