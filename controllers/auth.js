const express=require('express');
var router=express.Router();
const userloginController=require('../controllers/userloginController');
const adminController=require('../controllers/adminController');
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');
const Admin=mongoose.model('Admin');
const passport= require('passport');
/*router.get('/',(_req,res)=>{
    res.render('login/login');

});*/

/*router.post('/login1',(req,res)=>{
   passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login/login'
   
});
});*/
router.post("/login1", passport.authenticate('customer', { 
    successRedirect: "/ind/dashboard", 
    failureRedirect: "/login",
    failureFlash : true
}), function (req, res) { 
    if(!customer) 
    {   
        res.redirect('/login');
        req.flash('message'); 
    }
    
}); 
/*
router.post("/login3", passport.authenticate('admin', { 
    successRedirect: "/ind1/dashboard1", 
    failureRedirect: "/admin"
}), function (req, res) { 
}); */
//------------ Logout GET Handle ------------//

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/login');

});
router.post("/login3", passport.authenticate('admin', { 
    successRedirect: "/ind1/dashboard1", 
    failureRedirect: "/admin",
    failureFlash:true
}), function (req, res) { 
    if(!customer) 
    {   
        res.redirect('/admin');
        req.flash('message'); 
    }
}); 
//------------ Logout GET Handle ------------//

router.get('/logout1',(req,res)=>{
    req.logout();
     req.flash('success', 'You are logged out');
     res.redirect('/admin');  

});
module.exports = router;