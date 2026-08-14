import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'

function Card({ name, image, id, price }) {
  let { currency, addToCart } = useContext(shopDataContext)
  let navigate = useNavigate()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart({ _id: id, name, image, price }, 1)
  }

  return (
    <div onClick={() => navigate(`/product/${id}`)} className='w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop:blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-[#80808049]'>
      <div className='relative w-full h-[80%]'>
        <img src={image} alt="" className='w-[100%] h-full rounded-sm object-cover' />
      </div>
      <div className='w-full flex items-center justify-between mt-2'>
        <div className='text-[#c3f6fa] text-[18px]'>{name}</div>
        <div className='text-[#f3fafa] text-[14px]'>{currency} {price}</div>
      </div>
      <button
        onClick={handleAddToCart}
        className='mt-3 w-full rounded-lg bg-[#f83ead] px-3 py-2 text-sm font-semibold text-white'
      >
        Add to Cart
      </button>
    </div>
  )
}

export default Card