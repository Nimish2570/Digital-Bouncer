const ErrorHandler = require("../utils/errorhandler")

module.exports = (err,  req, res,next) =>{
    err.statusCode= err.statusCode || 500;
    err.message= err.message || "Internal Server error";


    //wrong mongodb id error
    if(err.name==="CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    //mongoose validation error
    if(err.name==="ValidationError"){
        const message = Object.values(err.errors).map(value => value.message);
        err = new ErrorHandler(message,400);
    }
    //mongoose duplicate key error
    if(err.code===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400);
    }
    //wrong jwt error
    if(err.name==="JsonWebTokenError"){
        const message = "JSON web token is invalid. Try again!!!";
        err = new ErrorHandler(message,400);
    }
    //jwt expired error
    if(err.name==="TokenExpiredError"){
        const message = "JSON web token is expired. Try again!!!";
        err = new ErrorHandler(message,400);
    }
    
    
    res.status(err.statusCode).json({
        success: false,
        // error: err,
        message:err.message
    })
}