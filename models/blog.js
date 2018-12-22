const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
 
var BlogSchema = mongoose.Schema({
    Title: {type: String, required:true},
    PageUrl: {type: String, required:true, unique:true},
    MetaDescription: {type: String, required:true},
    PageDescription: {type: String, required:true},
    PageHtml: {type: String, required:true},
    BlogProfileImage: {type: String, required:true},
    OtherImages: {type: [String], required:true},
}
// {
//     collection: 'Vendor'
// }
);

BlogSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Blog',BlogSchema);