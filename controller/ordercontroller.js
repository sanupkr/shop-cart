const Order = require("../models/orders");
const Product = require("../models/product");

const errorhandler = require("../utils/errorhandler");

exports.neworder = async (req,res,next) => {
  const {shippingInfo,paymentInfo,orderItems,totalPrice} = req.body;

  const order = await Order.create({
    shippingInfo,
    paymentInfo,
    orderItems,
    totalPrice,
    user:req.user._id,
    paidAt:Date.now()
  });


  res.status(200).json({
    success:true,
    order
  })
}

exports.getuserorder = async (req,res,next) => {
  const order = await Order.find({user:req.user._id});

  if(!order)
  {
    return next(new errorhandler("no order found",404));
  }

  res.status(200).json({success:true, order});


}

exports.getallorders = async (req,res,next) => {
  const orders = await Order.find();
  let total_amount = 0;

  orders.forEach( order => {
    total_amount +=order.totalPrice;
  });

  res.status(200).json({success:true,total_amount, orders});
}

exports.updateorder = async (req,res,next) => {
  const order = await Order.findByIdAndUpdate(req.params.id,{
    orderStatus:req.body.orderStatus,
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });

  await order.save();

  res.status(200).json({success:true, order});

}

exports.deleteorder = async (req,res,next) => {
  const order = await Order.findById(req.params.id);

  if(!order)
  {
    return next(new errorhandler('order not found',404));
  }


  await order.remove();

  res.status(200).json({success:true, message:'successfully deleted'});
}
