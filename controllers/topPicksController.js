const express = require('express'); 
const multer =require("multer");

const router = express.Router();

const Vendor =require('../models/vendor');
const checkAuth = require("../middleware/check-auth");
const TopPick = require("../models/topPicks");

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
};


const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid) {
            error = null;
        }
        callback(error, 'backend/images');
        // backend/images is the relative url from server.js file
    },
    filename: (req, file, callback)=>{
        const name = file.originalname
                    .toLowerCase()
                    .split(' ')
                    .join('-');
        const extension = MIME_TYPE_MAP[file.mimetype];
        callback(null, name +'-' + Date.now() + '.' + extension);
    }
});
var upload = multer({storage:storage});

 
/////////////////////////fetch Vendors list////////////////
router.get("",checkAuth,(req, res, next)=>{
    const City = req.query.City;
    const BusinessCategory = req.query.BusinessCategory;
    const vendorQuery = Vendor.find({ BusinessCategory:BusinessCategory, City: City, IsDeleted:false });
    let fetchedVendors;
    vendorQuery
    .then((doccument)=>{
        fetchedVendors = doccument;

        return Vendor.count({ BusinessCategory:BusinessCategory, City: City, IsDeleted:false });
    })
    .then(count=> {
        res.status(200).json({
            Status: true,
            MessageId: 2,
            message:"data fetched successfully",
            maxVendors:count,
            Results:fetchedVendors
        })
    })
    .catch((error)=>{
        res.status(201).json({
            Status: false,
            MessageId: 3,
            message:"No vendor available for following constraints",
            maxVendors:null,
            Results:null
        })
    });
});


////////////////////banner uploading//////////
router.post("/banner",checkAuth,upload.single("image"),(req, res, next)=>{
    const url = req.protocol + "://" +req.get("host");
    const BannerUrl = url +"/images/" + req.file.filename;
    res.status(200).json({
        Status: true,
        MessageId: 1,
        message:"data successfully submitted",
        Results:BannerUrl
    });
});
 
router.post("/Pick",checkAuth,(req, res, next)=>{
const topPick = new TopPick({
        PreFix: req.body.PreFix,
        BusinessCategory: req.body.BusinessCategory,
        MetaTitle: req.body.MetaTitle,
        MetaDescription: req.body.MetaDescription,
        PageDescription: req.body.PageDescription,
        City: req.body.City,
        PageImage: req.body.PageImage,
        VendorList: req.body.VendorList,
        PageHeader: req.body.PageHeader,
        PageFooter: req.body.PageFooter,
        PageUrl: req.body.PageUrl,
        OtherImages: req.body.OtherImages,
    });
    topPick.save((err,docs)=>{
        if(!err) {
            res.status(200).json({
                Status: true,
                MessageId: 1,
                message:"data successfully submitted",
                Results:{
                    ...docs}
            });
        }
        else {
            res.status(200).json({
                Status: false,
                MessageId: 4,
                message:"error while storing data",
                Results:err
            });
        }
    });
});

router.get("/toPicks",(req, res, next)=>{

    const topPickQuery = TopPick.find();
    let fetchedTopPick;
    topPickQuery
    .then((doccument)=>{
        fetchedTopPick = doccument;

        return TopPick.count();
    })
    .then(count=> {
        res.status(200).json({
            Status: true,
            MessageId: 2,
            message:"data fetched successfully",
            totalPicks:count,
            Results:fetchedTopPick
        })
    })
    .catch((error)=>{
        res.status(201).json({
            Status: false,
            MessageId: 3,
            message:"No picks available",
            totalPicks:null,
            Results:null
        })
    });
});
 
router.get("/:PageUrl", (req, res, next) => {
    TopPick.findOne({PageUrl:req.params.PageUrl}).then(topPick => {
            if (topPick) {
                res.status(200).json({
                    Status: true,
                    MessageId: 2,
                    message:"data fatch successfully",
                    Results: topPick
                });
            } 
            else {
                res.status(404).json({
                    Status: false,
                    MessageId: 3,
                    message:"ERROR IN RETRIVING BLOG"
                });
            }
        });
});
module.exports = router;