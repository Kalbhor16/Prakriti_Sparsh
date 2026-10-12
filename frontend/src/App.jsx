import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import Ai from './component/Ai'
import Nav from './component/Nav'
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Collection from './pages/Collection'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'

function ProtectedRoute({ children }) {
  const { userData, isLoading } = useContext(userDataContext)
  const location = useLocation()

  if (isLoading) {
    return <div className="min-h-screen pt-[110px] text-center text-[#1F4D3A]">Restoring your session...</div>
  }
  return userData ? children : <Navigate to="/login" state={{ from: location }} replace />
}

function App() {
  const { userData, isLoading } = useContext(userDataContext)
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <>
      {!isAuthPage && <Nav />}
      <Routes>
        <Route
          path="/login"
          element={isLoading ? <div className="min-h-screen pt-[110px] text-center text-[#1F4D3A]">Restoring your session...</div> : userData ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoading ? <div className="min-h-screen pt-[110px] text-center text-[#1F4D3A]">Restoring your session...</div> : userData ? <Navigate to="/" replace /> : <Registration />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/placeorder" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
        <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Ai />
    </>
  )
}

export default App
