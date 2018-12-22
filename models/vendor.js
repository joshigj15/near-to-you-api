const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

var VendorSchema = mongoose.Schema({
    BusinessName: {type: String, required:true},
    BusinessCategory: {type: String, required:true},
    ContactPerson: {type: String, required:true},
    ContactNo: {type: Number, required:true},
    BusinessEmail: {type: String, required:true},
    BusinessAddress: {type: String, required:true},
    City: {type: String, required:true},
    BusinessZip: {type: Number, required:true},
    BusinessWebsite: {type: String, required:true},
    BusinessDesc: {type: String, required:true},
    ProfileUrl: {type: String,  required: true },
    Url: { type: String,  required: true, unique: true},
    IsDeleted: { type: Boolean, required: true}
}
// {
//     collection: 'Vendor'
// }
);
VendorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Vendor',VendorSchema);
