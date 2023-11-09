const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggedIn,isreviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");




  
//8. creating the review(post) route 
router.post("/",isLoggedIn,validateReview,wrapAsync( reviewController.createReview));
  
  //9.delete route for reviews
  router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapAsync( reviewController.destroyReview));

  module.exports=router;