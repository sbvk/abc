const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');
require('../models/employee.model');

router.get('/',(req,res)=>{
    res.render('index.hbs',
    {user:req.user}
    );

});





module.exports=router;
