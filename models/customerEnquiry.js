const mongoose = require('mongoose');

const CustomerEnquirySchema = mongoose.Schema({
    CustomerName: {type: String},
    CustomerEmail: {type: String},
    CustomerContactNo: {type: String},
    EventType: {type: String, required:true},
    BusinessCategory: {type: String, required:true},
    DateOfEvent: {type: String, required:true},
    NoOfGuest: {type: Number, required:true},
    City: {type: [String], required:true}
}
// {
//     collection: 'Vendor'
// }
);

module.exports = mongoose.model('CustomerEnquiry',CustomerEnquirySchema);