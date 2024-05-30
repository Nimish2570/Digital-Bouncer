const Order = require("../models/orderModel")
const User = require("../models/userModel")
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//create new order
exports.newOrder = catchAsyncErrors(async(req, res, next) => {
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
        const existingSoftware = await User.findOne({
            _id: req.user._id,
            "allSoftwares.ProductID": item.product
        });

        if (existingSoftware) {
            // Software already exists, update its end date
            await User.findOneAndUpdate({
                _id: req.user._id,
                "allSoftwares.ProductID": item.product
            }, {
                $set: { "allSoftwares.$.EndDate": calculateEndDate(existingSoftware.allSoftwares.find(software => software.ProductID === item.product).EndDate, item.quantity) }
            });
        } else {
            // Software doesn't exist, push it
            const endDate = calculateEndDate(new Date(), item.quantity); // Calculate end date
            softwaresToUpdate.push({
                ProductID: item.product,
                EndDate: endDate
            });
        }
    }

    if (softwaresToUpdate.length > 0) {
        await User.findByIdAndUpdate(req.user._id, {
            $push: { allSoftwares: { $each: softwaresToUpdate } }
        });
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Function to calculate end date based on current date and quantity
function calculateEndDate(startDate, quantity) {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + quantity); // Increment months by quantity
    return endDate;
}


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