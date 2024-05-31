const express=require('express');
const router= express.Router();
const {createBlog, blogsCount, getAllBlogs, getByIDBlog, updateBlog,getBySlugBlog,deleteBlog}= require('../Controllers/blogController');


router.post('/create' ,createBlog); 
router.post('/getAll' ,getAllBlogs);
router.post('/getByID' ,getByIDBlog);
router.post('/getBySlug' ,getBySlugBlog);
router.post('/getCount' ,blogsCount);
router.post('/update' ,updateBlog); 
router.post('/delete' ,deleteBlog); 


module.exports=router;