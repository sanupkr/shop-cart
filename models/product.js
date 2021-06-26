const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'please enter the name of product'],
    maxLength:[100,'length cannot exceed from 100 characters'],
    trim:true
  },
  price:{
    type:Number,
    required:[true,"please enter the price"],
    default:0.0,
    maxLength:[5,"length cannot exceed 5 characters"]
  },
  description:{
    type:String,
    required:[true,'please enter the name product description'],
  },
  ratings:{
    type:Number,
    default:0
  },
  images:[{
    public_id:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    }
  }],
  category:{
    type:String,
    required:[true,'please enter the category of the product'],
    enum:{
      values:[
        'Electronics',
        'Books',
        'Clothes',
        'Grocery',
        'Automobile',
        'Food',
        "Headphones",
        "Accessories",
        "Cameras",
        "Laptops"
      ]
    }
  },
  seller:{
    type:String,
    required:[true,"plese enter the name of seller"]
  },
  stock:{
    type:Number,
    required:[true,"please enter the number of stocks"],
    default:0
  },
  reviews:[
    {
      user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
      name:{
        type:String,
        required:true
      },
      rating:{
        type:Number,
        default:0
      },
      comment:{
        type:String,
        required:true
      }
    }
  ],
  numOfReviews:{
    type:Number,
    default:0
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});


module.exports = mongoose.model("Product",productschema);
