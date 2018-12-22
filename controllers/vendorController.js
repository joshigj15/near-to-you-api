const express = require('express');
const multer =require("multer");

// const app = express();
const router = express.Router();

const Vendor =require('../models/vendor');
const checkAuth = require("../middleware/check-auth");


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


///////////////////create vendor/////////////
router.post("",checkAuth,upload.single("image"),(req, res, next)=>{
    const url = req.protocol + "://" +req.get("host");
    const vendor = new Vendor({
        BusinessName: req.body.BusinessName,
        BusinessCategory: req.body.BusinessCategory,
        ContactPerson: req.body.ContactPerson,
        ContactNo: req.body.ContactNo,
        BusinessEmail: req.body.BusinessEmail,
        BusinessAddress: req.body.BusinessAddress,
        City: req.body.City,
        BusinessZip: req.body.BusinessZip,
        BusinessWebsite: req.body.BusinessWebsite,
        BusinessDesc: req.body.BusinessDesc,
        ProfileUrl: url +"/images/" + req.file.filename,
        Url: req.body.Url,
        IsDeleted: false
    });
    vendor.save((err,docs)=>{
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

/////////////////////////////update vendor/////

router.put("/:id",checkAuth, upload.single("image"),(req, res, next) => {
    // if(!ObjectId.isValid(req.params.id)){
    //     return res.Status(400).json({
    //         Status: false,
    //         MessageId: 3,
    //         message:"no doccument available with this given ID"
    //     });
    // }
    // else {
        let ProfileUrl = req.body.ProfileUrl;
        if(req.file) {
            const url = req.protocol + "://" +req.get("host");
            ProfileUrl = url + '/images/'+ req.file.filename;
        }
        const vendor = new Vendor({
            _id: req.body.vendorId,
            BusinessName: req.body.BusinessName,
            BusinessCategory: req.body.BusinessCategory,
            ContactPerson: req.body.ContactPerson,
            ContactNo: req.body.ContactNo,
            BusinessEmail: req.body.BusinessEmail,
            BusinessAddress: req.body.BusinessAddress,
            City: req.body.City,
            BusinessZip: req.body.BusinessZip,
            BusinessWebsite: req.body.BusinessWebsite,
            BusinessDesc: req.body.BusinessDesc,
            ProfileUrl: ProfileUrl,
            Url: req.body.Url,
            IsDeleted: false
        });
            Vendor.updateOne({ _id: req.params.id }, vendor).then(result => {
                res.status(200).json({
                    Status: true,
                    MessageId: 8,
                    message:"Update successfully",
                    Results:result
                });
        })
            .catch((err)=>{
                res.status(200).json({
                    Status: false,
                    MessageId: 9,
                    message:"Error in update",
                    Results:err
                });
            });
    // }
});

/////////////////////////fetch Vendors list////////////////
router.get("",(req, res, next)=>{
    //// + because we got data from query is type string and if we add + then javascript automatically convert then=m into number type
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const vendorQuery = Vendor.find({IsDeleted:false});
    let fetchedVendors;
    if(pageSize && currentPage) {
        vendorQuery.skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    vendorQuery
    .then((doccument)=>{
        fetchedVendors = doccument;
        return Vendor.count({IsDeleted:false});
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
            message:"error in data fatching",
            maxVendors:null,
            Results:null
        })
    });
});

/////////////////////////find particular vendor/////
router.get("/:url", (req, res, next) => {
    // if(!ObjectId.isValid(req.params.id)){
    //     return res.Status(400).json({
    //         Status: false,
    //         MessageId: 3,
    //         message:"no doccument available with this given ID"
    //     });
    // }
    // else {
        Vendor.findOne({Url:req.params.url, IsDeleted:false}).then(vendor => {
            if (vendor) {
                res.status(200).json({
                    Status: true,
                    MessageId: 2,
                    message:"data fatch successfully",
                    Results: vendor
                });
            } 
            else {
                res.status(404).json({
                    Status: false,
                    MessageId: 3,
                    message:"ERROR IN RETRIVING VENDOR"
                });
            }
        });
    // }
});


////////////////////////find vendor from Id/////
router.get("/vendor/:vendorId", (req, res, next) => {
    // if(!ObjectId.isValid(req.params.id)){
    //     return res.Status(400).json({
    //         Status: false,
    //         MessageId: 3,
    //         message:"no doccument available with this given ID"
    //     });
    // }
    // else {
        Vendor.findOne({_id:req.params.vendorId, IsDeleted:false}).then(vendor => {
            if (vendor) {
                res.status(200).json({
                    Status: true,
                    MessageId: 2,
                    message:"data fatch successfully",
                    Results: vendor
                });
            } 
            else {
                res.status(404).json({
                    Status: false,
                    MessageId: 3,
                    message:"ERROR IN RETRIVING VENDOR"
                });
            }
        });
    // }
});

///////////////delete vendor////////////
router.delete("/:vendorId",checkAuth,(req, res, next)=>{
    // if(!ObjectId.isValid(req.params.id)){
    //     return res.Status(400).json({
    //         Status: false,
    //         MessageId: 3,
    //         message:"no doccument available with this given ID"
    //     });
    // }
    // else{
        console.log("ID is"+req.params.vendorId);
        Vendor.updateOne(
            {_id:req.params.vendorId},
            {
                $set: { IsDeleted: true}
            })
            .then((data)=>{
                res.status(200).json({
                Status: true,
                MessageId: 5,
                message:"data deleted successfully",
                Result:data
            });
        })
        .catch((err)=>{
            res.status(201).json({
                Status: false,
                MessageId: 6,
                message:" error while deleting data",
                Result:err
            });
        });
    // }
});


module.exports = router;