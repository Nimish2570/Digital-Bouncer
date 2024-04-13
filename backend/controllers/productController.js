const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFratures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


//create Product

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});


//get all products

exports.getAllProducts =catchAsyncErrors(async(req,res)=>{

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments()
    const apifeature =new ApiFratures(Product.find(),req.query).search().filter()
    // let products = await apifeature.query;
    let filteredProductsCount = apifeature.query.length;
    apifeature.pagination(resultPerPage);
    let products = await apifeature.query;

    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
        
    })

}
)

//get all products (admin)
exports.getAdminProducts =catchAsyncErrors(async(req,res)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})



//get product details
exports.getProductDetails =catchAsyncErrors( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
       return next(new ErrorHandler("Product not Found",404));
    }
    res.status(200).json({
        success:true,
        product
    })
})
// update product
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
    let product = Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not Found",404));
     }
    //update images
    if(product.images){
    let images = product.images;
    if(typeof req.body.images === "string"){
        images.push(req.body.images);
    }else{
        images = req.body.images;
    }
    //delete images associated with the product
    for(let i=0;i<product.images.length;i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const imagesLinks = [];
    for(let i=0;i<images.length;i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder:"products"
        });
        imagesLinks.push({
            public_id:result.public_id,
            url:result.secure_url
        })
    }
  }
      
    product= await Product.findByIdAndUpdate(req.params.id , req.body , {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    
    res.status(200).json({
        success:true,
        product
    })
})


//delete product
exports.deleteProduct =catchAsyncErrors( async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return next(new ErrorHandler("Product not Found",404));
         }

        // Delete images associated with the product
        product.images.forEach(async (image) => {
            await cloudinary.v2.uploader.destroy(image.public_id);
        });


        await product.deleteOne(); // Use deleteOne to delete the document

        return res.status(200).json({
            success: true,
            message: "Product is deleted"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
})





//create new review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
          product.numberOfReviews = product.reviews.length;
      });
    } else {
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
  
  //Get All reviews Of a Single Product
  exports.getProductReviews =catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
       return next(new ErrorHandler("Product not Found",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
  })

    //Delete Product Review
    exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
        const product = await Product.findById(req.query.productId);
    
        const reviews = product.reviews.filter(
          (rev) => rev._id.toString() !== req.query.id.toString()
        );
    
        const numberOfReviews = reviews.length;
    
        let ratings = 0;
    
        reviews.forEach((rev) => {
          ratings += rev.rating;
        });
    
        const avg = ratings / reviews.length;
    
        await Product.findByIdAndUpdate(
          req.query.productId,
          {
            reviews,
            rating: avg,
            numberOfReviews,
          },
          {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          }
        );
    
        res.status(200).json({
          success: true,
        });
      });
