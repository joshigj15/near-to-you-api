const CustomerEnquiry = require("../models/customerEnquiry");

const Vendor = require('../models/vendor');


exports.serchVendors = (req, res, next) => {
        const customerEnquiry = new CustomerEnquiry({
            CustomerName: req.body.CustomerName,
            CustomerEmail: req.body.CustomerEmail,
            CustomerContactNo: req.body.CustomerContactNo,
            EventType: req.body.EventType,
            BusinessCategory: req.body.BusinessCategory,
            DateOfEvent: req.body.DateOfEvent,
            NoOfGuest: +req.body.NoOfGuest,
            City: req.body.City
        });
            customerEnquiry.save().then(result => {
                EnquiryFor = result;
                return Vendor
                    .find({
                        IsDeleted:false,
                        BusinessCategory:customerEnquiry.BusinessCategory,
                        City: customerEnquiry.City});   
            })
            .then((docs)=>{
                res.status(200).json({
                    Status: true,
                    MessageId: 9,
                    message:"the list of vendors which follow particular cariteria",
                    Results:[...docs]
                });
            })
            .catch((err)=>{
                res.status(200).json({
                    Status: false,
                    MessageId: 9,
                    message:"Error in Saved enquiry",
                    Results:err
                });
            });
};
