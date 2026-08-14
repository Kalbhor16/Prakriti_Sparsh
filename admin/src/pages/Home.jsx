import React from 'react'
import Nav from '../component/Nav'
import SideBar from '../component/SideBar'
import { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
 
  const { serverUrl } = useContext(authDataContext)

  const fetchCounts=async () => {
    try {
      const productResult = await axios.get(`${serverUrl}/api/product/list`,{} ,{ withCredentials: true })
      const orderResult = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
     
      setTotalProducts(productResult.data.length)
      setTotalOrders(orderResult.data.length)
     
    } catch (error) {
      console.error('Failed to fetch counts', error)
    }
  }
  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    
    <div className='w-[100vw] h-[100vh] bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8] text-[white] relative'>
     <Nav/>
     <SideBar/>
      <div className='w-[70vh] h-[100vh] absolute top-[60px] left-[25%] flex items-start justify-start flex-col gap-[40px] py-[100px]'>
        <h1 className='text-[36px] text-[#afe2f2]'>PrakritiSparsh Admin Panel</h1>
        <div className=' flex items-center justify-start gap-[50px] flex-col md:flex-row'>
        <div className='text-[#dcfafd] w-[400px] max-[90%] h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-sm shadow-black backdrop:blur-lg md-text-[25px] text-[20px] border-[1px]border-[#969595]'>Total No of Products: <span className='text-[24px] px-[20px] py-[20px] rounded-lg flex items-center justify-center border-[1px] border-[#969595]'> {totalProducts} </span></div>
        <div className='text-[#dcfafd] w-[400px] max-[90%] h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-sm shadow-black backdrop:blur-lg md-text-[25px] text-[20px] border-[1px]border-[#969595]'>Total No of Orders: <span className='text-[24px] px-[20px] py-[20px] rounded-lg flex items-center justify-center border-[1px] border-[#969595]'>{totalOrders}</span></div>
      <div/>
      </div>
      
     
      </div>
    </div>
  )
}


export default Home