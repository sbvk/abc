const express=require('express');
var router=express.Router();
const {ensureAuthenticated}=require('../config/checkAuth1');
const mongoose=require('mongoose');
const Admin=mongoose.model('Admin');
require('../models/admin.model');
router.get('/',(_req,res)=>{
    res.render('adm/adminlogin');

});
router.get('/dashboard1', ensureAuthenticated,(req,res)=> {
    
    res.render('admindash/admindashbd', {
   name: req.user.name,
   email: req.user.email
    

});
});


module.exports=router;