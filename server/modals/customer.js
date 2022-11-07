const mongoose=require("mongoose")

const customerSchema=new mongoose.Schema({
    customerid:{
        type:String,
        required:true
    },
    customername:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const customerModel=mongoose.model("customer",customerSchema)

module.exports=customerModel;