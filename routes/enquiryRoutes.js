const express = require("express");

const EnquiryController = require("../controllers/enquiryController");

const router = express.Router();


router.put("", EnquiryController.saveCustomerLead);


module.exports = router;
