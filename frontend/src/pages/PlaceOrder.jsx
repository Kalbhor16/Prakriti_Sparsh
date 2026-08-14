import React, { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import razorpayLogo from '../assets/razorpay_logo.png'

function PlaceOrder() {
  const { cartItems, currency, delivery_fee, getCartItems } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [stateField, setStateField] = useState('')
  const [pincode, setPincode] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [loading, setLoading] = useState(false)

  const subtotal = useMemo(() => cartItems.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0), [cartItems])
  const total = subtotal + (cartItems.length ? delivery_fee : 0)

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const existingScript = document.querySelector(`script[src="${src}"]`)
      if (existingScript) {
        if (window.Razorpay) return resolve(true)
        existingScript.addEventListener('load', () => resolve(true))
        existingScript.addEventListener('error', () => resolve(false))
        return
      }

      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.defer = true
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const verifyPayment = async (response, orderId) => {
    try {
      const verifyResponse = await axios.post(
        `${serverUrl}/api/order/verifyrazorpay`,
        {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          orderId,
        },
        { withCredentials: true }
      )

      if (verifyResponse.status === 200) {
        await getCartItems()
        navigate('/order')
        alert('Payment successful! Your order is confirmed.')
      } else {
        alert('Payment verification failed. Please contact support.')
      }
    } catch (error) {
      console.error('verifyPayment error', error)
      alert('Payment verification failed. Please try again.')
    }
  }

  const handleRazorpayPayment = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !street.trim() || !city.trim() || !pincode.trim() || !country.trim() || !phone.trim()) return alert('Please fill all shipping details')
    setLoading(true)

    const items = cartItems.map(i => ({ productId: i._id, quantity: i.quantity, name: i.name, image1: i.image1 || i.image }))

    try {
      const scriptLoaded = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js')
      if (!scriptLoaded) {
        alert('Unable to load Razorpay SDK. Please try again later.')
        return
      }

      const response = await axios.post(
        `${serverUrl}/api/order/placeorderrazorpay`,
        {
          items,
          amount: total,
          address: {
            firstName,
            lastName,
            email,
            street,
            city,
            state: stateField,
            pincode,
            country,
            phone,
            fullAddress: address,
          },
        },
        { withCredentials: true }
      )
      console.log('placeorderrazorpay response', response)
      const paymentData = response.data
      console.log('placeorderrazorpay data', paymentData)
      if (!paymentData?.payment || !paymentData?.order) {
        const msg = paymentData?.message || 'Unable to create payment order. Please try again.'
        alert(msg)
        return
      }

      const razorpayKey = paymentData.key
      if (!razorpayKey) {
        alert('Razorpay key is not configured. Please contact support.')
        return
      }

      if (!window.Razorpay) {
        alert('Razorpay SDK failed to load. Please refresh and try again.')
        return
      }

      const options = {
        key: razorpayKey,
        amount: paymentData.payment.amount,
        currency: paymentData.payment.currency,
        name: 'PrakritiSparsh',
        description: 'Complete your order payment',
        order_id: paymentData.payment.id,
        handler: async (paymentResponse) => {
          await verifyPayment(paymentResponse, paymentData.order._id)
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email,
          contact: phone,
        },
        notes: {
          orderId: paymentData.order._id,
        },
        theme: {
          color: '#F83EAD',
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('handleRazorpayPayment error', error, error.response?.data)
      const serverMsg = error.response?.data?.message || error.message || 'Payment initialization failed. Please try again.'
      alert(serverMsg)
    } finally {
      setLoading(false)
    }
  }


  const handlePlaceOrder = async () => {
    if (paymentMethod === 'Razorpay') return handleRazorpayPayment()
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !street.trim() || !city.trim() || !pincode.trim() || !country.trim() || !phone.trim()) return alert('Please fill all shipping details')
    setLoading(true)
    try {
      const items = cartItems.map(i => ({ productId: i._id, quantity: i.quantity, name: i.name, image1: i.image1 || i.image }))
      const res = await axios.post(
        `${serverUrl}/api/order/placeorder`,
        {
          items,
          amount: total,
          address: {
            firstName,
            lastName,
            email,
            street,
            city,
            state: stateField,
            pincode,
            country,
            phone,
            fullAddress: address,
          },
          paymentMethod,
        },
        { withCredentials: true }
      )
      alert(res.data?.message || 'Order placed successfully')
      await getCartItems()
      navigate('/order')
    } catch (error) {
      console.error('placeOrder error', error)
      alert('Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen mt-[60px] bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8] py-24 px-4'>
      <div className='max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white'>
        <h2 className='text-2xl font-semibold mb-6'>Place Order</h2>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <h3 className='font-semibold mb-3'>Shipping Address</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First name' className='w-full p-3 rounded-lg bg-transparent border border-white/20' />
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last name' className='w-full p-3 rounded-lg bg-transparent border border-white/20' />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email' className='w-full p-3 rounded-lg bg-transparent border border-white/20' />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' className='w-full p-3 rounded-lg bg-transparent border border-white/20' />
              <input value={street} onChange={(e) => setStreet(e.target.value)} placeholder='Street address' className='w-full md:col-span-2 p-3 rounded-lg bg-transparent border border-white/20' />
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' className='w-full p-3 rounded-lg bg-transparent border border-white/20' />
              <input value={stateField} onChange={(e) => setStateField(e.target.value)} placeholder='State' className='w-full p-3 rounded-lg bg-transparent border border-white/20' />
              <input value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder='Pincode' className='w-full p-3 rounded-lg bg-transparent border border-white/20' />
              <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' className='w-full p-3 rounded-lg bg-transparent border border-white/20' />
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Additional address details (optional)' className='w-full md:col-span-2 min-h-[120px] p-3 rounded-lg bg-transparent border border-white/20' />
            </div>
          </div>
          <div>
            <h3 className='font-semibold mb-3'>Order Summary</h3>
            <div className='bg-white/5 rounded-xl p-4'>
              <div className='flex flex-col gap-3 max-h-60 overflow-auto mb-4'>
                {cartItems.length === 0 && <div className='text-sm text-gray-200'>Your cart is empty.</div>}
                {cartItems.map(item => (
                  <div key={item._id} className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <img src={item.image1} alt={item.name} className='w-16 h-16 object-contain rounded-lg bg-white p-1' />
                      <div>
                        <div className='font-semibold'>{item.name}</div>
                        <div className='text-sm text-gray-200'>Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className='font-semibold'>{currency} {item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
              <div className='border-t border-white/10 pt-3'>
                <div className='flex items-center justify-between mb-2'><span>Subtotal</span><span>{currency} {subtotal}</span></div>
                <div className='flex items-center justify-between mb-2'><span>Delivery</span><span>{currency} {cartItems.length ? delivery_fee : 0}</span></div>
                <div className='flex items-center justify-between font-bold text-lg'><span>Total</span><span>{currency} {total}</span></div>
              </div>
              <div className='mt-4'>
                <h4 className='font-semibold mb-2'>Payment Method</h4>
                <div className='flex gap-3 flex-wrap'>
                  <button type='button' onClick={() => setPaymentMethod('COD')} className={`px-5 py-3 rounded-full border flex items-center gap-3 transition-all duration-200 transform ${paymentMethod === 'COD' ? 'bg-gradient-to-r from-[#ff9fcf] via-[#ff84b9] to-[#ff5b9f] text-black border-transparent shadow-2xl shadow-pink-500/20 scale-105' : 'bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white hover:text-white hover:shadow-xl hover:scale-[1.02]'}`}>
                    Cash on Delivery
                  </button>
                  <button type='button' onClick={() => setPaymentMethod('Razorpay')} className={`w-40 h-14 rounded-full border flex items-center justify-center transition-all duration-200 transform ${paymentMethod === 'Razorpay' ? 'bg-[#ffffff] border-transparent shadow-2xl shadow-blue-400/25 scale-105' : 'bg-transparent border-white/30 hover:bg-white/15 hover:border-white hover:shadow-xl hover:scale-[1.02]'}`}>
                    <img src={razorpayLogo} alt='Razorpay' className='w-40 h-14 rounded-full' />
                  </button>
                </div>
              </div>
            </div>
            <button disabled={loading || cartItems.length === 0} onClick={handlePlaceOrder} className='w-full mt-4 py-3 rounded-2xl bg-[#FF57B9] font-semibold'>{loading ? 'Processing...' : paymentMethod === 'Razorpay' ? 'Pay with Razorpay' : 'Place Order'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
