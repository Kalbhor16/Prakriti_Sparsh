import jwt from "jsonwebtoken"
import { getAuthCookieOptions } from "../config/cookie.js"

const isAuth=async(req,res,next)=>{
    try {
        let {token}=req.cookies || {}
        if(!token){
            return res.status(401).json({message:"Authentication required"})
        }
        let verifyToken=jwt.verify(token, process.env.JWT_SECRET)
        req.userId=verifyToken.userId
        next()
    } catch (error) {
        res.clearCookie("token", getAuthCookieOptions())
        return res.status(401).json({message:"Session expired or invalid"})
    }
}

export default isAuth