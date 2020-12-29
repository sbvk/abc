const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');
const bcrypt=require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');


router.get('/',function(req,res,next){
    res.render('forgot/forgot.hbs',{
        user: req.user
    });
})
router.post('/',function(req,res,next){
    async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
            Customer.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
              req.flash('error', 'No account with that email address exists.');
              return res.redirect('/forgot');
            }
            
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
            user.save(function(err) {
              done(err, token, user);
              console.log(user.email);
            });
          });
        },
        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
               
              user: 'custardmodels@gmail.com',
              pass: 'Custard@123',
             
            
        }
          });
          var mailOptions = {
            to: user.email,
            from: 'custardmodels@gmail.com',
            subject: 'Account Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
             
            req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            res.redirect('/forgot');
            done(err, 'done');
          });
        }
      ], function(err) {
        if (err) return next(err);
        req.flash('error','Error in recovering password')
        res.redirect('/login');
      });

       
 });
 

  
module.exports=router;