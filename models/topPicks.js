const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const TopPickSchema = mongoose.Schema({
    PreFix: {type: String, required:true},
    BusinessCategory: {type: String, required:true},
    MetaTitle: {type: String, required:true, unique: true },
    MetaDescription: {type: String, required:true},
    PageDescription: {type: String, required:true},
    City: {type: String, required:true},
    PageImage: {type: String, required:true},
    VendorList: {type: [String], required:true},
    PageHeader: {type: String},
    PageFooter: {type: String},
    PageUrl: {type:String, required:true, unique:true},
    OtherImages:{type: [String],required:true},
}
// {
//     collection: 'Vendor'
// }
);

TopPickSchema.plugin(uniqueValidator);
module.exports = mongoose.model('TopPick',TopPickSchema);
