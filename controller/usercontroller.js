const User = require("../models/users");
const errorhandler = require("../utils/errorhandler");
const sendtoken = require("../utils/jwttoken");
const sendemail = require("../utils/sendemail");
const crypto = require('crypto');
const cloudinary = require('cloudinary');

exports.registeruser = async (req,res,next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:'avatars',
    width:150,
    crop:"scale"
  })
  const {username,email,password} = req.body;
  const user = await User.create({
    username,
    email,
    password,
    avatar:{
      public_id:result.public_id,
      url:result.secure_url
    }
  });

  sendtoken(user,200,res);
}

exports.loginuser = async (req,res,next) =>{
    const {email,password} = req.body;
    if(!email || !password)
    {
      return next(new errorhandler('please enter your email and password',400));
    }


    const user = await User.findOne({email}).select('+password');

    if(!user)
    {
      return next(new errorhandler('please enter correct email and password',401));
    }

    if(await user.comparepassword(password))
    {
      sendtoken(user,200,res);
    }
    else{
      return next(new errorhandler('wrong email or password',404));
    }

}

exports.logoutuser = (req,res,next) => {
  res.cookie('token',null,{
    expires:new Date(Date.now()),
    httpOnly:true
  })

  res.status(200).json({
    success:true,
    message:('logged out')
  })
}

exports.forgotpassword = async (req,res,next) => {
  const user = await User.findOne({email:req.body.email});

  if(!user)
  {
    return next(new errorhandler('user not found with this email',404));
  }

  const resettoken = user.generateresettoken();

  await user.save({validateBeforeSave:false});
  // ${req.protocol}://${req.get('host')}/api/v1
  const reseturl = `http://localhost:3000/password/reset/${resettoken}`;

  const message = `a request for password change has been generated with url:\n\n${reseturl}\n\nif u  have not done it kindly ignore`;


  try{

    await sendemail({
      email:user.email,
      subject:'password recovery',
      message
    })

    res.status(200).json({success:true,message:'a reset message has been sent'});

  }catch(error){
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({validateBeforeSave: false});

      return next(new errorhandler('internal error',500));
  }


}

exports.resetPassword = async (req,res,next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({resetPasswordToken});

  if(!user)
  {
      return next(new errorhandler('token mismatch or expired',404));
  }

  if(req.body.resetpassword!==req.body.confirmresetpassword)
  {
    return next(new errorhandler('password do not match',404));
  }

  user.password = req.body.resetpassword;

  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;


  await user.save();

  sendtoken(user,200,res);


}

exports.getcurrentuser = async (req,res,next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success:true,
    user
  })
}

exports.changepassword = async (req,res,next) => {
  const user = await User.findById(req.user.id).select("+password");
  const {oldpassword,newpassword} = req.body;
  if(await user.comparepassword(oldpassword))
  {
    user.password = newpassword;

    await user.save();

    sendtoken(user,200,res);

  }


  res.status(403).json({success:false,message:"wrong password"});
}

exports.updateprofile = async (req,res,next) => {
  const user = await User.findByIdAndUpdate(req.user.id,
    {
      username:req.body.username,
      email:req.body.email
    },
  {
    new:true,
    runValidators:true,
    useFindAndModify:false
  });


  await user.save();

  res.status(200).json({success:true, user});
}

exports.getusers = async (req,res,next) => {
  const users = await User.find();

  res.status(200).json({success:true,users});
}

exports.getuserbyid = async (req,res,next) => {
  const user = await User.findById(req.params.id);

  if(!user)
  {
    return next(new errorhandler('user does not exist',404));
  }

  res.status(200).json({success:true,user});
}

exports.updateuser = async (req,res,next) => {
  const user = await User.findById(req.params.id);
  if(!user)
  {
    return next(new errorhandler('user does not exist',404));
  }
  const userdata = {
    "username":req.body.username,
    "email":req.body.email,
    "role":req.body.role
  }

  const newuser = await User.findByIdAndUpdate(req.params.id,userdata,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });

  await newuser.save();

  res.status(200).json({success:true,newuser});



}
