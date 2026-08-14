import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import SideBar from '../component/SideBar'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'

const statusOptions = [
  'order placed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)
  const { serverUrl } = useContext(authDataContext)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const result = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      )
      setOrders(result.data || [])
    } catch (error) {
      console.error('Failed to load orders', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdating(orderId)
      await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status },
        { withCredentials: true }
      )
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      )
    } catch (error) {
      console.error('Failed to update order status', error)
    } finally {
      setUpdating(null)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date'
    const date = new Date(timestamp)
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8] text-white overflow-x-hidden'>
      <Nav />
      <div className='w-full flex'>
        <SideBar />
        <main className='w-[82%] lg:ml-[320px] md:ml-[230px] ml-[100px] mt-[110px] px-[30px] pb-[60px]'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
              <div>
                <h1 className='text-[32px] md:text-[44px] font-semibold'>Orders Dashboard</h1>
                <p className='text-[16px] text-[#f9f6ffcc] mt-2 max-w-[700px]'>Review recent orders, track payments, and update fulfillment status for customer purchases.</p>
              </div>
              <div className='bg-white/15 border border-white/30 rounded-2xl px-5 py-4'>
                <div className='text-sm text-[#f9f6ffcc]'>Total orders</div>
                <div className='text-3xl font-bold mt-1'>{orders.length}</div>
              </div>
            </div>

            {loading ? (
              <div className='text-lg text-white/90'>Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className='rounded-3xl border border-white/20 bg-white/10 p-10 text-center text-white/90'>
                No orders found at the moment.
              </div>
            ) : (
              <div className='grid gap-6'>
                {orders.map((order) => (
                  <section key={order._id} className='rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl'>
                    <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4'>
                      <div>
                        <div className='text-[22px] font-semibold text-white'>{order.address?.firstName || 'Unknown Customer'}</div>
                        <div className='text-sm text-[#f2f2f2cc] mt-1'>{order.address?.email || 'No email provided'}</div>
                        <div className='text-sm text-[#f2f2f2cc] mt-2'>Order ID: <span className='font-medium text-white'>{order._id}</span></div>
                      </div>
                      <div className='flex flex-wrap gap-3'>
                        <span className='rounded-full bg-[#ffffff22] px-4 py-2 text-sm text-[#f8f8f8]'>Placed on {formatDate(order.Date)}</span>
                        <span className='rounded-full bg-[#ffffff22] px-4 py-2 text-sm text-[#f8f8f8]'>₹ {order.amount?.toFixed(2) ?? '0.00'}</span>
                        <span className='rounded-full bg-[#ffffff22] px-4 py-2 text-sm text-[#f8f8f8]'>Payment: {order.payment ? 'Paid' : 'COD'}</span>
                      </div>
                    </div>

                    <div className='grid md:grid-cols-2 gap-6 mt-6'>
                      <div className='rounded-3xl border border-white/10 bg-white/5 p-4'>
                        <div className='text-sm uppercase tracking-[0.2em] text-[#e4d7f0]'>Shipping</div>
                        <p className='mt-3 text-white'>{order.address?.street || 'Street not available'}</p>
                        <p className='text-[#f2f2f2cc]'>{order.address?.city}, {order.address?.pincode}</p>
                        <p className='text-[#f2f2f2cc]'>{order.address?.country}</p>
                        <p className='text-[#f2f2f2cc] mt-1'>Phone: {order.address?.phone || 'N/A'}</p>
                      </div>
                      <div className='rounded-3xl border border-white/10 bg-white/5 p-4'>
                        <div className='text-sm uppercase tracking-[0.2em] text-[#e4d7f0]'>Order summary</div>
                        <div className='mt-3 space-y-2'>
                          <div className='flex items-center justify-between text-white/90'>
                            <span>Items</span>
                            <span>{order.items?.length ?? 0}</span>
                          </div>
                          <div className='flex items-center justify-between text-white/90'>
                            <span>Method</span>
                            <span>{order.paymentMethod || 'COD'}</span>
                          </div>
                          <div className='flex items-center justify-between text-white/90'>
                            <span>Current status</span>
                            <span className='rounded-full bg-[#f6f6f6]/20 px-3 py-1 text-sm text-white'>{order.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 grid gap-4 lg:grid-cols-[1.8fr_1fr]'>
                      <div className='rounded-3xl border border-white/10 bg-white/5 p-4'>
                        <div className='text-sm uppercase tracking-[0.2em] text-[#e4d7f0]'>Ordered items</div>
                        <div className='mt-3 space-y-3 text-white/90'>
                          {order.items?.map((item, index) => (
                            <div key={index} className='rounded-2xl bg-[#ffffff12] p-3'>
                              <div className='flex items-center justify-between gap-3'>
                                <div>
                                  <p className='font-medium'>{item.name || 'Unnamed item'}</p>
                                  <p className='text-sm text-[#f2f2f2cc]'>Qty: {item.quantity || 1}</p>
                                </div>
                                <p className='text-sm text-[#f2f2f2cc'>₹ {item.price ?? 'N/A'}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className='rounded-3xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between gap-4'>
                        <div>
                          <label className='block text-sm uppercase tracking-[0.2em] text-[#e4d7f0] mb-3'>Update status</label>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className='w-full rounded-2xl border border-white/20 bg-[#ffffff12] px-4 py-3 text-white outline-none transition focus:border-[#ffe3ff]'
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status} className='bg-black text-white'>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type='button'
                          onClick={() => handleStatusChange(order._id, order.status)}
                          disabled={updating === order._id}
                          className='mt-2 w-full rounded-2xl bg-[#F83EAD] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e13293] disabled:cursor-not-allowed disabled:bg-[#c285a4]'
                        >
                          {updating === order._id ? 'Updating…' : 'Save status'}
                        </button>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Orders