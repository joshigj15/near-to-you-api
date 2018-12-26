const express = require("express");

const LandingController = require("../controllers/landingController");

const router = express.Router();

router.post("", LandingController.serchVendors);

module.exports = router;