import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import SideBar from '../component/SideBar'
import upload from '../assets/Upload.png'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
function Add() {
  let [image1, setImage1] = useState(false)
  let [image2, setImage2] = useState(false)
  let [image3, setImage3] = useState(false)
  let [image4, setImage4] = useState(false)
  let [name, setName]=useState("");
  let [description, setDescription]=useState("")
  let [category,setCategory]=useState("Men")
  let [price,setPrice]=useState("")
  let [subCategory,setSubCategory]=useState("Syrup")
  let [bestSeller,setBestSeller]=useState(false)
  let {serverUrl}=useContext(authDataContext)
  const handleAddProduct=async(e)=>{
      e.preventDefault()  
      try {
          let formData=new FormData()
          formData.append("name",name)
          formData.append("description",description)
          formData.append("price",price)
          formData.append("subCategory",subCategory)
          formData.append("category",category)
          formData.append("bestseller",bestSeller)
          formData.append("image1",image1)
          formData.append("image2",image2)
          formData.append("image3",image3)
          formData.append("image4",image4)
          let result=await axios.post(serverUrl + "/api/product/addproduct", formData, {withCredentials:true})
          console.log(result.data)
          if(result.data){
             setName("")
             setDescription("")
             setImage1(false)
             setImage2(false)
             setImage3(false)
             setImage4(false)
             setPrice("")
             setBestSeller(false)
             setCategory("Men")
             setSubCategory("Syrup")
          }
        } catch (error) {
          console.log(error)
        }
  }
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8] text-[white] overflow-x-hidden relative'>
      <Nav />
      <SideBar />
      <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[1%]'>
        <form action="" onSubmit={handleAddProduct} className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]'>
          <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white'>Add Product Page</div>
          <p className='text-[20px] md:text-[25px] font-semibold'>Upload Image</p>
          <div className="w-full flex items-center justify-start gap-4">
            <label htmlFor="image1" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
              <img src={!image1 ? upload : URL.createObjectURL(image1)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]' />
              <input type="file" id='image1' hidden onChange={(e) => setImage1(e.target.files[0])} />
            </label>
            <label htmlFor="image2" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
              <img src={!image2 ? upload : URL.createObjectURL(image2)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]' />
              <input type="file" id='image2' hidden onChange={(e) => setImage2(e.target.files[0])} />
            </label>
            <label htmlFor="image3" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
              <img src={!image3 ? upload : URL.createObjectURL(image3)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]' />
              <input type="file" id='image3' hidden onChange={(e) => setImage3(e.target.files[0])} />
            </label>
            <label htmlFor="image4" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
              <img src={!image4 ? upload : URL.createObjectURL(image4)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]' />
              <input type="file" id='image4' hidden onChange={(e) => setImage4(e.target.files[0])} />
            </label>
          </div>
          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Name</p>
            <input type="text" placeholder='Type here' className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]' onChange={(e)=>setName(e.target.value)} value={name}  required/>
          </div>
          <div className='w-[80%] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Description</p>
            <textarea type="text" placeholder='Type here' className='w-[600px] max-w-[98%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2]' onChange={(e)=>setDescription(e.target.value)} value={description}  required/>
          </div>
          <div className='w-[80%] flex items-center gap-[10px] flex-wrap'>
            <div className='md:w-[30%] w-[80%] flex items-start sm:justify-center flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold w-[100%]'>Product Category</p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]' onChange={(e)=>setCategory(e.target.value)} value={category}  required>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div className='md:w-[30%] w-[80%] flex items-start sm:justify-center flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold w-[100%]'>Sub-Category</p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]' onChange={(e)=>setSubCategory(e.target.value)} value={subCategory}>
                 <option value="Powder">Powder</option>
                <option value="Syrup">Syrup</option>
                <option value="Tablets">Tablets</option>
                <option value="Oil">Oil</option>
              </select>
            </div>
          </div>
          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Price</p>
            <input type="number" placeholder='₹ 2000' className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'onChange={(e)=>setPrice(e.target.value)} value={price}/>
          </div>
          <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[20px]'>
            <input type="checkbox" id='checkbox' className='w-[25px] h-[25px] cursor-pointer' onChange={()=>setBestSeller(prev=>!prev)}/>
            <label htmlFor="checkbox" className='text-[18px] md:text-[22px] font-semibold'>
              Add to BestSeller
            </label>
          </div>
          <button className='w-[140px] px-[20px] py-[20px] rounded-xl bg-[#65d8f7] flex items-center justify-center gap-[10px] text-black active:bg-slate-700 active:text-white cursor-pointer active:border-[2px] border-white'>Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default Add