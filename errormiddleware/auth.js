
const jwt = require('jsonwebtoken');
const User = require("../models/users");
const Errorhandler = require('../utils/errorhandler');
exports.isauthentic = async (req,res,next) => {
  const {token} = req.cookies;

  if(!token)
  {
    return next(new Errorhandler('login first to access',401));
  }

  const decoded = jwt.verify(token,process.env.JWT_SECRET)
  req.user = await User.findById(decoded.id);

  next();

}

exports.accessauthentication = (...roles) => {
  return (req,res,next) => {
    if(!roles.includes(req.user.role))
    {
        return next(new Errorhandler(`${req.user.role} is not allowed to acess the resource`,403));
    }


    next();
  }
}
