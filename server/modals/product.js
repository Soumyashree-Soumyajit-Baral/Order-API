
const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    productid:{
        type:String,
        required:true
    },
    producttype:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    productprice:{
        type:Number,
        required:true
    },
    availablequantity:{
        type:Number,
        required:true
    }
})
const productModel=mongoose.model("product",productSchema)

module.exports=productModel;