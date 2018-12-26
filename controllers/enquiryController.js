const VendorEnquiry = require("../models/vendorEnquiry");

exports.saveCustomerLead = (req, res, next) => {
        const vendorEnquiry = new VendorEnquiry({
            CustomerName: req.body.CustomerName,
            CustomerEmail: req.body.CustomerEmail,
            CustomerContactNo: +req.body.CustomerContactNo,
            VendorId: req.body.VendorId,
        });
            vendorEnquiry.save().then(result => {
                res.status(200).json({
                    Status: true,
                    MessageId: 8,
                    message:"Enquiry saved successfully",
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