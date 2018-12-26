const express = require("express");

const BlogController = require("../controllers/blogController");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, BlogController.saveBlog);

router.get("", BlogController.getBlogList);

router.get("/:PageUrl", BlogController.getBlogData);


module.exports = router;