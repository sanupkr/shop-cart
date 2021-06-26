const mongoose = require("mongoose");


const connectdatabase = () => {
  mongoose.connect(process.env.DB_LOCAL,{useNewUrlParser:true,useUnifiedTopology:true}).then(con => {
    console.log(`database connected with mongoose: ${con}`);
  });
}

module.exports = connectdatabase;
