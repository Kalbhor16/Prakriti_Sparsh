import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';
function Collection() {
  let [showFilter, setShowFilter] = useState(false)
  let {products,search}=useContext(shopDataContext)
  let [filterProduct,setFilterProduct]=useState([])
  let [category,setCategory]=useState([])
  let [subCategory,setSubCategory]=useState([])
  let [sortType,setSortType]=useState("relavent")

  const toggleCategory=(e)=>{
      if(category.includes(e.target.value)){
        setCategory(prev=>prev.filter(item=>item !==e.target.value))
      }else{
        setCategory(prev=>[...prev,e.target.value])
      }
  }

  const toggleSubCategory=(e)=>{
      if(subCategory.includes(e.target.value)){
        setSubCategory(prev=>prev.filter(item=>item !==e.target.value))
      }else{
        setSubCategory(prev=>[...prev,e.target.value])
      }
  }

 
  const applyFilter=()=>{
    let productCopy=products.slice();
    if(search){
      productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productCopy=productCopy.filter(item=>category.includes(item.category))
    }
    if(subCategory.length>0){
      productCopy=productCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setFilterProduct(productCopy)
  }

   useEffect(()=>{
    setFilterProduct
  },[products])

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search])
  return (
    <div className='w-[99vw] min-h-[100vh] bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8] flex items-start justify-start flex-col md:flex-row justify-start pt-[100px] overflow-x-hidden z-[2] pb-[100px]'>
      <div className={`md:w-[30vh] lg:w-[20vw] w-[100vw] md:min-h-[100vh] ${showFilter ? "h-[45vh]" : "h-[8vh]"} p-[20px] border-r-[1px] border-gray-400 text-[#aaf5fa] lg:fixed`}>
        <p className='text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer' onClick={() => setShowFilter(prev => !prev)}>FILTERS
          {!showFilter && <FaChevronRight className='text-[18px] md:hidden' />}
          {showFilter && <FaChevronDown className='text-[18px] md:hidden' />}
        </p>
        <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>
          <p className='text-[18px] text-[#f8fafa]' >CATEGORIES</p>
          <div className='w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col'>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Men'} className='w-3 cursor-pointer' onChange={toggleCategory}/> Men</p>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Women'} className='w-3 cursor-pointer' onChange={toggleCategory}/> Women</p>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Kids'} className='w-3 cursor-pointer' onChange={toggleCategory}/> Kids</p>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Both'} className='w-3 cursor-pointer' onChange={toggleCategory}/> Both</p>
          </div>
        </div>
        <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>
          <p className='text-[18px] text-[#f8fafa]'>SUB-CATEGORIES</p>
          <div className='w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col'>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Powder'} className='w-3 cursor-pointer' onChange={toggleSubCategory}/> Powder</p>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Syrup'} className='w-3 cursor-pointer'onChange={toggleSubCategory} /> Syrup</p>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Tablets'} className='w-3 cursor-pointer'onChange={toggleSubCategory} /> Tablets</p>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Oil'} className='w-3 cursor-pointer'onChange={toggleSubCategory} /> Oil</p>
          </div>
        </div>
      </div>
      <div className='lg:pl-[20%] md:py-[10px]'>
        <div className='md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]'>
          <Title text1={"ALL"} text2={"COLLECTIONS"}/>
        </div>
        <div className='lg:w-[80vw] md:w-[60vw] w-[100vw] min:h-[70vh] flex items-center justify-center flex-wrap gap-[30px]'>
          {
            filterProduct.map((item,index)=>(
              <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default Collection