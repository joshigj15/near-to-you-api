const express = require("express");

const TopPickController = require("../controllers/topPicksController");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();


router.get("", TopPickController.getVendorList);

router.post("/banner", checkAuth, extractFile, TopPickController.ImageUpload);

router.post("/Pick", checkAuth, TopPickController.createTopPick);

router.get("/toPicks", TopPickController.getTopPickList);

router.get("/:PageUrl", TopPickController.getTopPickData);

module.exports = router;
