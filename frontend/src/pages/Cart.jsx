import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'

function Cart() {
  const { currency, cartItems, removeFromCart } = useContext(shopDataContext)
  const navigate = useNavigate()

  const handleProceedToCheckout = () => {
    if (!cartItems || cartItems.length === 0) return alert('Your cart is empty. Add products to continue.')
    navigate('/placeorder')
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = cartItems.length > 0 ? 40 : 0
  const total = subtotal + deliveryFee

  return (
    <div className='min-h-screen mt-[60px] bg-[#fff5fb] px-4 md:px-8 py-24'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-semibold text-[#333] mb-6'>Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className='bg-white rounded-xl shadow p-8 text-center text-gray-600'>
            Your cart is empty. Add some products to continue.
          </div>
        ) : (
          <div className='grid gap-6 lg:grid-cols-[2fr_1fr]'>
            <div className='flex flex-col gap-4'>
              {cartItems.map((item) => (
                <div key={item._id} className='bg-white rounded-xl shadow p-4 flex gap-4 items-center'>
                  <img
                    src={item.image1 || item.image}
                    alt={item.name}
                    className='w-24 h-24 object-cover rounded-lg'
                  />

                  <div className='flex-1'>
                    <h3 className='font-semibold text-lg text-[#333]'>{item.name}</h3>
                    <p className='text-[#f83ead] mt-1'>Price: {currency} {item.price}</p>

                    <div className='flex items-center gap-3 mt-3'>
                      <span className='text-gray-700 font-semibold'>Qty: {item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item._id, 1)}
                        className='px-3 py-1 rounded-full bg-[#f83ead] text-white text-sm'
                      >
                        Remove 1
                      </button>
                    </div>
                  </div>

                  <div className='text-right'>
                    <p className='font-semibold text-[#333]'>
                      {currency} {item.quantity * item.price}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id, item.quantity)}
                      className='text-sm text-red-500 mt-2'
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='bg-white rounded-xl shadow p-6 h-fit'>
              <h3 className='text-xl font-semibold text-[#333]'>Order Summary</h3>
              <div className='flex justify-between mt-4 text-gray-700'>
                <span>Subtotal</span>
                <span>{currency} {subtotal}</span>
              </div>
              <div className='flex justify-between mt-2 text-gray-700'>
                <span>Delivery</span>
                <span>{currency} {deliveryFee}</span>
              </div>
              <div className='flex justify-between mt-4 text-lg font-semibold text-[#333] border-t pt-4'>
                <span>Total</span>
                <span>{currency} {total}</span>
              </div>
              <button onClick={handleProceedToCheckout} disabled={cartItems.length === 0} className={`w-full mt-6 py-3 rounded-lg ${cartItems.length === 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-[#f83ead] text-white'}`}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
