const express=require("express")
const mongoose=require("mongoose")
const ejs=require("ejs")
const customerModel=require("./modals/customer")
const orderModel=require("./modals/order")
const productModel=require("./modals/product")

const app=express()

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(3000,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("server started on 30000")
    }
})

mongoose.connect("mongodb://localhost/api-web-tech-assignment-order",()=>{
    console.log("connected to db")
},(err)=>{
    console.log(err)
})


app.post("/orders",async(req,res)=>{
    const qcount=req.body.quantity
    const user= req.body.customerid
    productModel.find({productname:req.body.productname}).then((data)=>{
        if(data.length){
            var pid=data[0].productid
            var count=data[0].availablequantity
            var acount=count-qcount
            console.log(acount)
            if(qcount<=count){
                orderModel.create({
                    customerid:user,
                    productid:pid,
                    productname:req.body.productname,
                    quantity:req.body.quantity
                }).then(async()=>{
                    productModel.updateOne({productname:req.body.productname},{$set:{availablequantity:acount}})
                    res.send("order placed sucessfully")
                }).catch((err)=>{
                    res.send(err.message)
                })
            }else{
                res.send("out of stock")
            }
        }else{
            res.send("Item not available")
        }
    })
})

app.post("/customer",(req,res)=>{
    customerModel.create({
        customerid:req.body.customerid,
        customername:req.body.customername,
        email:req.body.email,
        balance:req.body.balance
    }).then(()=>{
        res.send("customer added sucessfully")
    }).catch((err)=>{
        res.send(err.message)
    })
})

app.post("/product",(req,res)=>{
    productModel.create({
        productid:req.body.productid,
        producttype:req.body.producttype,
        productname:req.body.productname,
        productprice:req.body.productprice,
        availablequantity:req.body.availablequantity
        
    }).then(()=>{
        res.send("item added sucessfully.")
    }).catch((err)=>{
        res.send(err.message)
    })
})

app.get("/customer/:id",(req,res)=>{
    customerModel.find({customerid:req.params.id}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})
app.get("/product/:id",(req,res)=>{
    orderModel.find({producttype:req.params.id}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err.meaasge)
    })
})
app.get("/orders/:id",(req,res)=>{
    orderModel.find({productid:req.params.id}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err.message)
    })
})


app.put("/orders/:id/:name",(req,res)=>{
    console.log(req.params.name)
    productModel.updateOne({productname:req.params.id},{$set:{productprice:req.params.name}}).then(()=>{
        res.send("price updated sucessfully")
    }).catch((err)=>{
        res.send(err.message)
    })
})
app.put("/customer/:id/:name",(req,res)=>{
    console.log(req.params.name)
    customerModel.updateOne({email:req.params.id},{$set:{balance:req.params.name}}).then(()=>{
        res.send("price updated sucessfully")
    }).catch((err)=>{
        res.send(err.message)
    })
})

app.get("/orders",(req,res)=>{
    orderModel.find().then((data)=>{
        res.render("orders",{orders:data})
    })
})
app.get("/customer",(req,res)=>{
    customerModel.find().then((data)=>{
        res.render("showcustomer",{cusinfo:data})
    })
})
app.get("/product",(req,res)=>{
    productModel.find().then((data)=>{
        res.render("product",{prodinfo:data})
    })
})

