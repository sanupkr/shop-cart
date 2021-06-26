const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userschema = new mongoose.Schema({
    username:{
      type: String,
      required: [true,'Enter your username'],
      maxLength:[20,'username must be of maximum 20 characters']
    },
    email:{
      type: String,
      required: [true,'Enter your email'],
      unique: true,
      validate:[validator.isEmail,'please enter a valid email address']
    },
    password:{
      type: String,
      required: [true,'Enter your password'],
      minlength:[6,'password must be at least 6 characters'],
      select:false
    },
    avatar:[{
       public_id:{
         type:String,
         required: true
       },
       url:{
         type:String,
         required: true
       }
    }],
    role:{
      type:String,
      default:'user'
    },
    createdAt:{
      type:Date,
      default:Date.now
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
      type:Date
    }

});


//before saving user update password
userschema.pre('save', async function (next) {
    if(!this.isModified('password'))
    {
      next();
    }

    this.password = await bcrypt.hash(this.password,10);
  }
);

userschema.methods.getjwttoken = function ()
{
  return jwt.sign({id:this._id,},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_TIME});
}


userschema.methods.comparepassword = async function(enteredpassword)
{
  return await bcrypt.compare(enteredpassword,this.password);
}

userschema.methods.generateresettoken = function ()  {

  //create resettoken using crypto builtin npm package
  const resettoken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto.createHash('sha256').update(resettoken).digest('hex');

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resettoken;
}




module.exports = mongoose.model('User',userschema);
