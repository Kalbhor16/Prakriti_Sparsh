import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import axios from 'axios'
import { shopDataContext } from '../context/ShopContext'
import placeholderImage from '../assets/back1.png'

function Order() {
  const [orderData, setOrderData] = useState([])
  const { currency, serverUrl } = useContext(shopDataContext)

  const loadOrders = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/userorders`, { withCredentials: true })
      if (result.data) {
        const allOrderItems = result.data.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.Date || order.date,
            orderId: order._id,
          }))
        )
        setOrderData(allOrderItems)
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    }
  }

  useEffect(() => {
    loadOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleTracking = (orderId) => {
    setTrackingOpen((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  return (
    <div className="w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orderData.length === 0 ? (
          <div className="col-span-full text-center text-gray-300">No orders found.</div>
        ) : (
          orderData.map((item, idx) => (
            <div key={idx} className="bg-[#ffffff0a] p-4 rounded-lg border border-gray-700 flex flex-col">
              <div className="flex items-center gap-4">
                <img src={item.image1 || item.image || item.imageUrl || placeholderImage} alt={item.name} className="w-24 h-24 object-cover rounded bg-gray-900" />
                <div className="flex-1">
                  <div className="text-gray-300 font-semibold">Name: {item.name || 'Unnamed item'}</div>
                  <div className="text-sm text-gray-300">Qty: {item.quantity || item.qty || 1}</div>
                  <div className="text-sm text-gray-300">Price: {currency} {item.price}</div>
                </div>
                <div className="text-sm text-gray-300 text-right">
                  <div className={`px-2 py-1 rounded ${item.status === 'delivered'? 'bg-green-600' : 'bg-yellow-600'}`}>{item.status}</div>
                  <div className="mt-2">{item.payment ? 'Paid' : 'Unpaid'}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-400">{item.paymentMethod ? item.paymentMethod : ''} • {item.date ? new Date(item.date).toLocaleString() : ''}</div>
             
             
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Order