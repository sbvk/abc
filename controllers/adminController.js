const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Admin=mongoose.model('Admin');
const passport= require('passport');

require('../models/admin.model');
router.get('/',(_req,res)=>{
    res.render('adm/adminlogin');

});





module.exports=router;
