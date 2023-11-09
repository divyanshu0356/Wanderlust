const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});


const listingController =require("../controllers/listings.js");



router
   .route("/")//1.to show all the listing(index route)
   .get(wrapAsync(listingController.index))
   .post(isLoggedIn,upload.single('listing[image]'),wrapAsync( listingController.createListing));
   
   

//3.new Listings(new & create route)
router.get("/new/list",isLoggedIn,listingController.renderNewFrom);

router
   .route("/:id")
   .get(wrapAsync( listingController.showListing))
    .put(isLoggedIn,
    isOwner,upload.single("listing[image]"),validateListing,wrapAsync( listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync( listingController.deleteListing));

//5.Edit route(edit and update route)
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync( listingController.renderEditForm));



module.exports=router;