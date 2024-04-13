const Order = require("../models/orderModel")
const User = require("../models/userModel")
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//create new order
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
    const {
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    
    const order = await Order.create({
        
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        orderStatus: "Delivered",
        user: req.user._id
    });

    // Update user allSoftwares
    const softwaresToUpdate = [];
    for (const item of orderItems) {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + item.quantity); // Increment months by quantity
        softwaresToUpdate.push({
            ProductID: item.product,
            EndDate: endDate
        });
    }

    await User.findByIdAndUpdate(req.user.id, {
        $push: {
            allSoftwares: { $each: softwaresToUpdate }
        }
    });

    res.status(200).json({
        success: true,
        order
    });
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email")
    if(!order){
        return next(new ErrorHandler("No order found with this ID",404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

//get logged in user orders
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user:req.user.id})
    res.status(200).json({
        success:true,
        orders
    })
})

//update order --Admin
exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("No order found with this ID",404))
    }
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400))
    }
   if(req.body.status === "Shipped"){
         order.orderItems.forEach(async item =>{
              await updateStock(item.product,item.quantity)
         })
    }



    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        order
    })
})


//get All orders --Admin
exports.allOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find()
    let totalAmount = 0;
    orders.forEach(order=>{
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})


async function updateStock(id,quantity){
    const product = await Product.findById(id)
    product.Stock = product.Stock - quantity
    await product.save({validateBeforeSave:false})
}

//delete order
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("No order found with this ID",404))
    }
    await order.deleteOne()
    res.status(200).json({
        success:true,
    })
})