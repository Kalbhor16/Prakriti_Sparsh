import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { FaRegRectangleList } from 'react-icons/fa6'
import { SiTicktick } from 'react-icons/si'
import { useLocation, useNavigate } from 'react-router-dom'

function SideBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      name: 'Add Items',
      icon: IoIosAddCircleOutline,
      path: '/add',
    },
    {
      name: 'List Items',
      icon: FaRegRectangleList,
      path: '/list',
    },
    {
      name: 'Orders',
      icon: SiTicktick,
      path: '/orders',
    },
  ]

  return (
    <aside
      className=" fixed left-0 top-[80px] z-40 h-[calc(100vh-80px)] w-[70px] md:w-[220px] bg-white border-r border-gray-200 shadow-sm transition-all duration-300 "
    >
      <div className="flex flex-col gap-2 p-3 md:p-4 mt-4">

        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className={` group relative flex items-center justify-center md:justify-start gap-3  px-3 md:px-4  py-3 rounded-xl cursor-pointer transition-all duration-200 ${isActive? 'bg-[#F83EAD] text-white shadow-md': 'text-gray-600 hover:bg-pink-50 hover:text-[#F83EAD]' }`}
            >
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full" />
              )}

              <Icon
                className={`
                  w-[22px] h-[22px]
                  flex-shrink-0
                  transition-transform duration-200
                  group-hover:scale-110
                `}
              />

              <p className="hidden md:block text-sm font-medium">
                {item.name}
              </p>

              <span
                className=" md:hidden absolute left-[65px] whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1  rounded-md  opacity-0 group-hover:opacity-100  pointer-events-none transition-opacity "
              >
                {item.name}
              </span>

            </div>
          )
        })}

      </div>
    </aside>
  )
}

export default SideBar
