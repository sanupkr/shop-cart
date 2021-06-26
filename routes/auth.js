const express = require('express');
const router = express.Router();
const {isauthentic,accessauthentication} = require("../errormiddleware/auth");
const {registeruser,
  loginuser,
  logoutuser,
  forgotpassword,
  resetPassword,
  getcurrentuser,
  changepassword,
  updateprofile,
  getusers,
  getuserbyid,
  updateuser} = require("../controller/usercontroller");

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/logout").get(logoutuser);
router.route("/password/forgot").post(forgotpassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isauthentic,getcurrentuser);
router.route("/password/change").put(isauthentic,changepassword);
router.route("/me/update").put(isauthentic,updateprofile);
router.route("/admin/users").get(isauthentic,accessauthentication('admin'),getusers);
router.route("/admin/user/:id").get(isauthentic,accessauthentication('admin'),getuserbyid);
router.route("/admin/user/update/:id").put(isauthentic,accessauthentication('admin'),updateuser);

module.exports = router;
