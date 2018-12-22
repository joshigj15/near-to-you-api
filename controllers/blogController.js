const express = require('express'); 
const router = express.Router();

const Blog = require("../models/blog");
const checkAuth = require("../middleware/check-auth");
 
router.post("",checkAuth,(req, res, next)=>{
const blog = new Blog({
        Title:req.body.Title,
        PageUrl:req.body.PageUrl,
        MetaTitle:req.body.MetaTitle,
        MetaDescription:req.body.MetaDescription,
        PageDescription:req.body.PageDescription,
        PageHtml:req.body.PageHtml,
        BlogProfileImage:req.body.BlogProfileImage,
        OtherImages:req.body.OtherImages
    });

    blog.save((err,docs)=>{
        if(!err) {
            res.status(200).json({
                Status: true,
                MessageId: 1,
                message:"data successfully submitted",
                Results:{
                    ...docs}
            });
        }
        else {
            res.status(200).json({
                Status: false,
                MessageId: 4,
                message:"error while storing data",
                Results:{
                    ...err}
            });
        }
    });
});

router.get("",(req, res, next)=>{

    const blogsQuery = Blog.find();
    let fetchedBlogs;
    blogsQuery
    .then((doccument)=>{
        fetchedBlogs = doccument;

        return Blog.count();
    })
    .then(count=> {
        res.status(200).json({
            Status: true,
            MessageId: 2,
            message:"data fetched successfully",
            totalBlogs:count,
            Results:fetchedBlogs
        })
    })
    .catch((error)=>{
        res.status(201).json({
            Status: false,
            MessageId: 3,
            message:"No blogs available",
            totalBlogs:null,
            Results:null
        })
    });
});
 
router.get("/:PageUrl", (req, res, next) => {
    Blog.findOne({PageUrl:req.params.PageUrl}).then(blog => {
            if (blog) {
                res.status(200).json({
                    Status: true,
                    MessageId: 2,
                    message:"data fatch successfully",
                    Results: blog
                });
            } 
            else {
                res.status(404).json({
                    Status: false,
                    MessageId: 3,
                    message:"ERROR IN RETRIVING BLOG"
                });
            }
        });
});

module.exports = router;