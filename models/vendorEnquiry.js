const mongoose = require('mongoose');

var VendorEnquirySchema = mongoose.Schema({
    CustomerName: {type: String, required:true},
    CustomerEmail: {type: String},
    CustomerContactNo: {type: Number},
    VendorId: {type: String, required:true}
}
// {
//     collection: 'Vendor'
// }
);

module.exports = mongoose.model('VendorEnquiry',VendorEnquirySchema);
