
module.exports = (user,statuscode,res) => {

  //calling for token by using user model
  const token = user.getjwttoken();


//providing options for cookie
  const options = {
    expires:new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly:true
  }

  res.status(statuscode).cookie('token',token,options).json({
    success:true,
    token,
    user
  });
}
