import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true, 
        unique:true
    },
    password:{
        type:String,
    },
    cartData:{
        type:[{
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity:{
                type:Number,
                required:true,
                default:1,
                min:1
            }
        }],
        default: []
    }
},{timestamps:true, minimize:false})

const User=mongoose.model("User",userSchema)

export default User