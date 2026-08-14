import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import axios from 'axios'
export const shopDataContext = createContext()
function ShopContext({ children }) {
  let [products, setProducts] = useState([])
  let [search, setSearch] = useState('')
  let [cartItems, setCartItems] = useState([])
  let { serverUrl } = useContext(authDataContext)
  let { userData } = useContext(userDataContext)
  let currency = '₹'
  let delivery_fee = 40;
  const getProducts=async()=>{
     try {
        let result=await axios.get(serverUrl + "/api/product/list")
        console.log(result.data)
        setProducts(result.data)
     } catch (error) {
        console.log(error)
     }
  }

  const getProductById = async (id) => {
    try {
      let result = await axios.get(serverUrl + `/api/product/detail/${id}`)
      return result.data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const getCartItems = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/cart`, { withCredentials: true })
      const items = Array.isArray(result.data)
        ? result.data
            .filter((cartItem) => cartItem.productId)
            .map((cartItem) => ({
              _id: cartItem.productId._id || cartItem.productId,
              ...cartItem.productId,
              quantity: Number(cartItem.quantity) || 0,
              cartId: cartItem._id,
            }))
        : []
      setCartItems(items)
    } catch (error) {
      console.log('getCartItems error', error)
      setCartItems([])
    }
  }

  const addToCart = async (product, quantity = 1) => {
    try {
      await axios.post(
        `${serverUrl}/api/user/addtocart`,
        { productId: product._id, quantity },
        { withCredentials: true }
      )
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item._id === product._id)
        if (existingItem) {
          return prevItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: (item.quantity || 0) + quantity }
              : item
          )
        }
        return [...prevItems, { ...product, quantity }]
      })
      await getCartItems()
    } catch (error) {
      console.log('addToCart error', error)
    }
  }

  const removeFromCart = async (productId, quantity = 1) => {
    try {
      await axios.post(
        `${serverUrl}/api/user/removefromcart`,
        { productId, quantity },
        { withCredentials: true }
      )
      await getCartItems()
    } catch (error) {
      console.log('removeFromCart error', error)
    }
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if (userData) {
      getCartItems()
    } else {
      setCartItems([])
    }
  }, [userData])

  let value = {
    products,
    serverUrl,
    currency,
    delivery_fee,
    getProducts,
    getProductById,
    search,
    setSearch,
    cartItems,
    getCartItems,
    addToCart,
    removeFromCart,
    cartCount
  }
  return (
    <div>
    <shopDataContext.Provider value={value}>
        {children}
    </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext