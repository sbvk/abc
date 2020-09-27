const express=require('express');
var router=express.Router();
const {ensureAuthenticated}=require('../config/checkAuth');
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');
const Admin=mongoose.model('Admin');

router.get('/',(_req,res)=>{
    res.render('login/login');

});
router.get('/dashboard',ensureAuthenticated, (req,res)=> {
    
    res.render('userdash/dash', {
    name: req.user.firstname,
    lname: req.user.lastname,
    email: req.user.email,
    contact: req.user.contact

});
});

/*
router.get('/dashbo',ensureAuthenticated, (req,res)=> {
    
    res.render('admindashbd', {
    name: req.user.name,
    
    email: req.user.email,
   

});
});*/

module.exports=router;