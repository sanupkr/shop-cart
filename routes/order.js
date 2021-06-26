const express = require('express');
const router = express.Router();

const {isauthentic,accessauthentication} = require("../errormiddleware/auth");
const {neworder,getuserorder,getallorders,updateorder,deleteorder} = require("../controller/ordercontroller");


router.route("/order/new").post(isauthentic,neworder);
router.route("/order/user").get(isauthentic,getuserorder);
router.route("/admin/order").get(isauthentic,accessauthentication('admin'),getallorders);
router.route("/admin/update/order/:id").put(isauthentic,accessauthentication('admin'),updateorder);
router.route("/admin/delete/order/:id").delete(isauthentic,accessauthentication('admin'),deleteorder);

module.exports = router;
