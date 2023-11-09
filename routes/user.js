const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user");
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users.js");



router
     .route("/signup")
     .get(userController.renderSignUp)
     .post(wrapAsync( userController.signup));
    
router
    .route("/login")
    .post(saveRedirectUrl,passport.authenticate("local",
    {failureRedirect:"/login",
    failureFlash:true}),
    userController.login)
    .get(userController.renderLoginForm);



router.get("/logout",userController.logout);
module.exports=router;