import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { FaArrowLeft } from 'react-icons/fa'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, currency, addToCart } = useContext(shopDataContext)
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find((item) => item._id === id)
      setProduct(found || null)
      setSelectedImage(found?.image1 || '')
    }
  }, [products, id])

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8] flex items-center justify-center px-5 py-24">
        <div className="max-w-3xl w-full rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-10 text-center text-white">
          <p className="text-xl font-semibold mb-4">Loading product details...</p>
          <p className="text-sm text-gray-200">If this page does not load, return to the collection and select a product again.</p>
        </div>
      </div>
    )
  }

  const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean)

  const handleBuyNow = async () => {
    try {
      await addToCart(product, 1)
      navigate('/placeorder')
    } catch (error) {
      console.error('Buy Now error', error)
      alert('Unable to proceed to checkout. Please try again.')
    }
  }
  return (
    <section className="min-h-screen bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center mt-[20px] gap-2 mb-10 rounded-full bg-white/20 px-5 py-3 text-white hover:bg-white/30 transition"
        >
          <FaArrowLeft /> Back to Products
        </button>
                                                                                          
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10">
              <img
                src={selectedImage || product.image1}
                alt={product.name}
                className="w-full h-[520px] object-contain bg-white/90"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`rounded-3xl overflow-hidden border cursor-pointer shadow-lg transition ${selectedImage === img ? 'border-[#FF57B9] ring-2 ring-[#FF57B9]/60' : 'border-white/20'}`}
                >
                <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-[180px] object-contain bg-white/90 p-2" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-white shadow-2xl">
            <div className="mb-6">
              <Title text1={product.name.split(' ')[0] || 'PRODUCT'} text2={product.name.split(' ').slice(1).join(' ') || 'DETAILS'} />
            </div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#bff1f9] mb-4">
              {product.category} • {product.subCategory}
            </p>
            <h1 className="text-4xl font-semibold text-white mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-[#ffb6d8] mb-6">{currency} {product.price}</p>
            <p className="leading-8 text-gray-200 mb-8">{product.description}</p>
            <div className="grid gap-4">
              <button
                onClick={() => addToCart(product, 1)}
                className="w-full rounded-2xl bg-[#FF57B9] py-4 text-lg font-semibold text-white transition hover:bg-pink-600"
              >
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="w-full rounded-2xl border border-white/30 bg-white/10 py-4 text-lg font-semibold text-white transition hover:bg-white/20">
                Buy Now
              </button>
            </div>
            <div className="mt-10 text-sm text-gray-300">
              <p className="font-semibold mb-2">Delivery Info</p>
              <p>Fast shipping across India. Standard delivery fee applies.</p>
            </div>
          </div>    
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
