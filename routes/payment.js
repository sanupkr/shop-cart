const express = require('express');
const router = express.Router();
const {isauthentic}  =  require("../errormiddleware/auth");
const {processpayment,getstripeapi}  = require("../controller/paymentcontroller");

router.route("/payment/process").post(isauthentic,processpayment);
router.route("/stripeapi").get(isauthentic,getstripeapi);

module.exports = router;
