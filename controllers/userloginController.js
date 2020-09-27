const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');
const passport= require('passport');

require('../models/employee.model');
router.get('/',(_req,res)=>{
    res.render('login/login');

});





module.exports=router;
