const mongoose = require('mongoose');

const CustomerEnquiry = mongoose.Schema({
    CustomerName: {type: String},
    CustomerEmail: {type: String},
    CustomerContactNo: {type: Number},
    EventType: {type: String, required:true},
    BusinessCategory: {type: String, required:true},
    DateOfEvent: {type: String, required:true},
    NoOfGuest: {type: String, required:true},
    City: {type: [String], required:true}
}
// {
//     collection: 'Vendor'
// }
);

module.exports = mongoose.model('CustomerEnquiry',CustomerEnquiry);