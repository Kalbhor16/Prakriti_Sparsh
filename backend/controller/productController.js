import uploadLoadCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"


export const addProduct =async(req, res)=>{
    try {
        let{name,description,price,category,subCategory,sizes,bestseller}=req.body
        let image1=await uploadLoadCloudinary(req.files.image1[0].path)
        let image2=await uploadLoadCloudinary(req.files.image2[0].path)
        let image3=await uploadLoadCloudinary(req.files.image3[0].path)
        let image4=await uploadLoadCloudinary(req.files.image4[0].path)
        let productData={
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            bestseller:bestseller ==="true"? true:false,
            date:Date.now(),
            image1,
            image2,
            image3,
            image4
        }
        let product =await Product.create(productData)
        return res.status(201).json(product)
    } catch (error) {
    console.error("AddProduct Error:", error);
    return res.status(500).json({
        success: false,
        message: error.message
    });
}
}

export const listProduct=async(req,res)=>{
    try {
        const product=await Product.find({});
        return res.status(200).json(product)
    } catch (error) {
        console.log("ListProduct error")
        return res.status(500).json({message:`ListProduct error ${error}`})
    }
}
export const removeProduct=async(req,res)=>{
    try {
        let {id}=req.params;
        const product=await Product.findByIdAndDelete(id)
        return res.status(200).json(product)
    } catch (error) {
        console.log("RemoveProduct Error")
        return res.status(500).json({message:`RemoveProduct Error ${error}`})
    }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    return res.status(200).json(product)
  } catch (error) {
    console.error('GetProductById Error:', error)
    return res.status(500).json({ message: `GetProductById Error ${error}` })
  }
} 