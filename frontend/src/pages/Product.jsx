import React, { useContext } from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import { shopDataContext } from '../context/ShopContext'

function Product() {
  const { isProductsLoading, productsError } = useContext(shopDataContext)

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-b from-[#ACC8A2] via-[#BBCCAD] to-[#BBCCADhhhhhh] flex items-center justify-start flex-col py-[20px]'>
      {isProductsLoading && <p role="status" className="mt-4 text-sm text-[#1F4D3A]">Loading products...</p>}
      {productsError && <p role="alert" className="mt-4 text-sm text-red-800">{productsError}</p>}
      <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col'>
        <LatestCollection/>
      </div>
      <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col'>
        <BestSeller/>
      </div>
    </div>
    
  )
}

export default Product