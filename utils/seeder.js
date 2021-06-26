const products = require("../data/product");
require('dotenv').config();
const connectdatabase = require("../databasecontroller/database");
const Product = require("../models/product");

connectdatabase();


const dataseeder = async () => {
  await Product.deleteMany();

  await Product.insertMany(products);
}

dataseeder();
