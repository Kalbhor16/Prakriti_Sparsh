import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import SideBar from '../component/SideBar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [loading, setLoading] = useState(true)

  const { serverUrl } = useContext(authDataContext)

  const fetchCounts = async () => {
    try {
      setLoading(true)

      const productResult = await axios.get(
        `${serverUrl}/api/product/list`,
        { withCredentials: true }
      )

      const orderResult = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      )

      setTotalProducts(productResult.data.length)
      setTotalOrders(orderResult.data.length)

    } catch (error) {
      console.error('Failed to fetch counts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#ff57b9] via-[#ff8fd2] to-[#ffc9e8] text-white">

      <Nav />

      <SideBar />

      <main className="pt-[100px] ml-0 md:ml-[220px] px-5 sm:px-8 lg:px-12 py-8">

        
        <div className="mb-10">
          <p className="text-white/80 text-sm sm:text-base mb-2">
            Welcome back 👋
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide">
            PrakritiSparsh
          </h1>

          <p className="text-white/80 mt-2 text-sm sm:text-base">
            Admin Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-5xl">

          <div
            className="group bg-white/20 backdrop-blur-lg
            border border-white/30 rounded-2xl
            p-6 sm:p-8
            shadow-lg shadow-black/10
            hover:bg-white/30
            hover:-translate-y-1
            transition-all duration-300"
          >

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/80 text-sm sm:text-base">
                  Total Products
                </p>

                <h2 className="text-4xl sm:text-5xl font-bold mt-2">
                  {loading ? '...' : totalProducts}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-xl bg-white/25 flex items-center justify-center text-2xl">
                📦
              </div>
            </div>

            <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[70%] bg-white rounded-full" />
            </div>
          </div>

          <div
            className="group bg-white/20 backdrop-blur-lg
            border border-white/30 rounded-2xl
            p-6 sm:p-8
            shadow-lg shadow-black/10
            hover:bg-white/30
            hover:-translate-y-1
            transition-all duration-300"
          >

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/80 text-sm sm:text-base">
                  Total Orders
                </p>

                <h2 className="text-4xl sm:text-5xl font-bold mt-2">
                  {loading ? '...' : totalOrders}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-xl bg-white/25 flex items-center justify-center text-2xl">
                🛒
              </div>
            </div>

            <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[55%] bg-white rounded-full" />
            </div>
          </div>

        </div>

        <div className="mt-8 max-w-5xl">
          <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-8">

            <h2 className="text-xl sm:text-2xl font-semibold">
              Manage Your Store
            </h2>

            <p className="text-white/75 mt-2 text-sm sm:text-base">
              Use the sidebar to manage products, orders, customers,
              and other PrakritiSparsh store activities.
            </p>

          </div>
        </div>

      </main>
    </div>
  )
}

export default Home
