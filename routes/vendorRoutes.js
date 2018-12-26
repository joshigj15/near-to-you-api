const express = require("express");

const VendorController = require("../controllers/vendorController");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, VendorController.createVendor);

router.put("/:id", checkAuth, extractFile, VendorController.updateVendor);

router.get("", VendorController.getVendorList);

router.get("/:url", VendorController.getVendorDataFromUrl);

router.get("/vendor/:vendorId", VendorController.getVendorDataFromId);

router.delete("/:id", checkAuth, VendorController.deleteVendor);

module.exports = router;
