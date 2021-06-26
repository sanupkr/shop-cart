const express = require("express");
const body_parser = require("body-parser");
const connectdatabase = require("./databasecontroller/database");
const app = express();
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const cookie_parser = require("cookie-parser");
const cloudinary = require("cloudinary");
const fileupload = require("express-fileupload");
const payment = require("./routes/payment");
require('dotenv').config();
const errormiddleware = require("./errormiddleware/errors");

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

app.use(body_parser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookie_parser());
app.use(fileupload());
app.use("/api/v1",products);
app.use("/api/v1",auth);
app.use("/api/v1",order);
app.use("/api/v1",payment);
module.exports = app;
app.use(errormiddleware);


//connecting to database
connectdatabase();



//connecting to port 3000
app.listen(process.env.PORT,()=> {
  console.log("server is running at port 4000");
})


//product api get request
