import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getAdmin, getCurrentUser } from "../controller/userController.js"
import { addToCart, getCart, removeFromCart } from "../controller/cartController.js"
import adminAuth from "../middleware/adminAuth.js"

let userRoutes=express.Router()
userRoutes.get("/getcurrentuser",isAuth,getCurrentUser)
userRoutes.get("/getadmin",adminAuth,getAdmin)
userRoutes.post("/addtocart",isAuth,addToCart)
userRoutes.get("/cart",isAuth,getCart)
userRoutes.post("/removefromcart",isAuth,removeFromCart)

export default userRoutes