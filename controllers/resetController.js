const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');
const bcrypt=require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var xoauth2 = require('xoauth2');

router.get('/',function(req,res,next){
    res.render('forgot/reset.hbs',{
        user: req.user
    });
})
module.exports=router;