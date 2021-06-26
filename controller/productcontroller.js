const Product = require("../models/product");
const errorhandler = require("../utils/errorhandler");
const ApiFeatures = require('../utils/apifeatures');


exports.deleteProduct = async (req,res,next) => {
  const product = await Product.findById(req.params.id);

  if(!product)
  {
    res.status(404).json({
      success:false,
      message:"product not found"
    })
  }

  await product.remove();

  res.status(200).json({success:true, message:"product deleted"});
}

exports.updateproduct = async (req,res,next) => {
  let product = await Product.findById(req.params.id);

  if(!product)
  {
    res.status(404).json({
      success:false,
      message:"product not found"
    })
  }

  product = await Product.findByIdAndUpdate(req.params.id,req.body,
  {
    new:true,
    runValidators:true,
    useFindAndUpdate:false
  });

  res.status(200).json({
    success:true,
    product
  })

}

exports.getsingleproduct = async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product)
    {
      return next(new errorhandler('product not found',404));
    }

    res.status(200).json({
      success:true,
      product
    })
}


exports.addproducts = async (req,res,next) =>{
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success:true,
    product
  })
}

exports.getproducts = async (req,res,next) => {


  const perpage = 4;
  const productcount = await Product.countDocuments();
  const product = new ApiFeatures(Product.find(),req.query).search().filter().pagination(perpage);
  const products = await product.query;

  if(products.length===0)
  {
    return next(new errorhandler('product not found',404));
  }
  res.status(200).json({
    success:true,
    products,
    perpage,
    productcount
  });

}


exports.addreview = async (req,res,next) => {
  const product = await Product.findById(req.params.id);

  if(!product)
  {
    return next(new errorhandler('product not found',404));
  }


  const {rating,comment} = req.body;
  var isreviewed = false;
  product.reviews.find(
    review => {

      if(review.user.toString()===req.user._id.toString())
      {
        isreviewed = true;
      }
    }
  );

  console.log(isreviewed);


  if(isreviewed)
  {
    product.reviews.forEach((review) => {
      if(review.user.id.toString()===req.user.id.toString())
      {
        review.rating = Number(rating)
        review.comment = comment
      }
    });
  }
  else{
    product.reviews.push({
      user:req.user,
      name:req.user.username,
      comment:comment,
      rating:Number(rating)
    });

    product.numOfReviews = product.reviews.length;
  }


  product.ratings = product.reviews.reduce((acc,review) => acc + review.rating ,0) / product.reviews.length;




  await product.save({validateBeforeSave:false});

  res.status(200).json({success:true,product});


}

exports.getreviews = async (req,res,next) => {
  const product = await Product.findById(req.params.id);

  if(!product)
  {
    return next(new errorhandler('product not found',404));
  }

  const reviews = product.reviews;

  res.status(200).json({success:true,reviews});

}
