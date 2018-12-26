const Vendor =require('../models/vendor');

const TopPick = require("../models/topPicks");

/////////////////////////fetch Vendors list////////////////
exports.getVendorList = (req, res, next)=>{
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
};

////////////////////banner uploading//////////
exports.ImageUpload = (req, res, next)=>{
    const url = req.protocol + "://" +req.get("host");
    const BannerUrl = url +"/images/" + req.file.filename;
    res.status(200).json({
        Status: true,
        MessageId: 1,
        message:"data successfully submitted",
        Results:BannerUrl
    });
};

///////////////////create topPick///////////
exports.createTopPick = (req, res, next)=>{
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
};

///////////////////get TopPickList//////////
exports.getTopPickList = (req, res, next)=>{

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
};

////////////////get TopPick Data////////////////
exports.getTopPickData = (req, res, next) => {
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
};