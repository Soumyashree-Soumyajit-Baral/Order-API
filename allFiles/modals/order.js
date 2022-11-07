

const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    customerid:{
        type:String,
        required:true
    },
    productid:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})
const orderModel=mongoose.model("order",orderSchema)

module.exports=orderModel;