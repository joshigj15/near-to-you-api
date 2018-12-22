const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const mongoose = require('mongoose');

const vendorRoutes = require("./controllers/vendorController");
const userRoutes = require("./controllers/userController");
const vendorEnquiry = require("./controllers/enquiryController");
const topPicksRoutes = require("./controllers/topPicksController");
const blogRoutes = require("./controllers/blogController");
const landingRoutes = require("./controllers/landingController");

// const Vendor = require('./models/vendor');
const app = express();

// mongoose.connect('mongodb://localhost:27017/ETU')
// .then(()=>{
//     console.log('MongoDb connection succeeded...');
// })
// .catch(()=>{
//     console.log('Failed to connect databace '+ JSON.stringify(err));
// });

mongoose.connect('mongodb+srv://joshigj15:K3GvPgTPer02lih7@cluster0-gunao.mongodb.net/NearToYou?retryWrites=true',{ useNewUrlParser: true })
.then(()=>{
    console.log('MongoDb connection succeeded...');
})
.catch((err)=>{
    console.log('Failed to connect database...'+JSON.stringify(err));
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

// app.use(cors({ origin: 'Server started at port: 3000' }));


//////////1st middleware/////////////
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH,PUT, DELETE, OPTIONS"
    );
    next();
});

// /////////////////create vendor////////
// app.post("/api/Vendor/CreateVendor",(req, res, next)=>{
//     const vendor = new Vendor({
//         BusinessName: req.body.BusinessName,
//         BusinessCategory: req.body.BusinessCategory,
//         ContactPerson: req.body.ContactPerson,
//         ContactNo: req.body.ContactNo,
//         BusinessEmail: req.body.BusinessEmail,
//         BusinessAddress: req.body.BusinessAddress,
//         State: req.body.State,
//         City: req.body.City,
//         BusinessZip: req.body.BusinessZip,
//         BusinessWebsite: req.body.BusinessWebsite,
//         BusinessDesc: req.body.BusinessDesc,
//         ProfileUrl: req.body.ProfileUrl,
//     });
//     vendor.save((err,docs)=>{
//         if(!err) {
//             console.log("data Inserted to database"+JSON.stringify(docs));
//             res.status(200).json({
//                 Status: true,
//                 MessageId: 1,
//                 message:"data successfully submitted",
//                 Results:docs
//             });
//         }
//         else {
//             console.log("error while storing database");
//             res.status(201).json({
//                 Status: false,
//                 MessageId: 4,
//                 message:"error while storing data",
//                 Results:err
//             });
//         }
//     });

// });

// /////////////////////////fetch Vendor////////////////
// app.get('/api/Vendor/getAllVendor',(req, res, next)=>{
//     //res.set('cache-control','s-max')
//     Vendor.find()
//     .then((doccument)=>{
//         console.log("data fatched successfully==>"+JSON.stringify(doccument));
//         res.status(200).json({
//             Status: true,
//             MessageId: 2,
//             message:"data fetched successfully",
//             Results:doccument
//         })
//     })
//     .catch((error)=>{
//         console.log("error in data fatching==>"+JSON.stringify(error));
//         res.status(201).json({
//             Status: false,
//             MessageId: 3,
//             message:"error in data fatching"
//         })
//     });
// });

// ////////////////////delete vendor/////////////
// app.delete("/api/Vendor/deleteVendor/:id",(req, res, next)=>{
//     console.log("mai aaya");
// Vendor.findByIdAndRemove(req.params.id)
//     .then((res)=>{
//         console.log("data Deleted in database"+JSON.stringify(res));
//         res.status(200).json({
//         Status: true,
//         MessageId: 5,
//         message:"data deleted successfully",
//         Results:res
//         });
//     })
//     .catch((err)=>{
//         console.log("data Deleted in database"+JSON.stringify(err));
//         res.status(201).json({
//             Status: false,
//             MessageId: 6,
//             message:" error while deleting data",
//             Results:err
//         });
//     });
// });

app.use("/api/vendor", vendorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/vendorEnquiry",vendorEnquiry);
app.use("/api/topPicksRoutes",topPicksRoutes);
app.use("/api/blog",blogRoutes);
app.use("/api/landing",landingRoutes);

//////////2nd middleware/////////////
app.use((req,res,next)=>{
    res.send('Hello from express');
});

module.exports = app;