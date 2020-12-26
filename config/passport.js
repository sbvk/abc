const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');
const Admin=mongoose.model('Admin');
//------------ Local User Model ------------//
 require('../models/employee.model');
 require('../models/admin.model');
 function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
  }
module.exports = function (passport) {
    passport.use('customer',
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //------------ User Matching ------------//
            Customer.findOne({
                email: email
            }).then(customer => {
                if (!customer) {

                    /*Admin.findOne({
                        email:email
                    }).then(customer=>{
                        if(!customer){
                            return done(null, false, { message: 'This email ID is not registered' });
                        } 
                        if (password==customer.password){
                            return done(null, customer); 
                           
                        }   else{
                            console.log('nopppp');
                        }
                    });*/

                    return done(null, false, { message: 'This email ID is not registered' });
                
                    
                }
                else {
                //------------ Password Matching ------------//
                bcrypt.compare(password, customer.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, customer);
                    } else {
                        return done(null, false, { message: 'Password incorrect! Please try again.' });
                    }
                }); }
                
            });
        }

        )
    );
    passport.use('admin',
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //------------ User Matching ------------//
            Admin.findOne({
                email: email
            }).then(customer => {
                if (!customer) {

                    return done(null, false, { message: 'This email ID is not registered' });            
                }
                else {
                //------------ Password Matching ------------//
                if (password==customer.password){
                    return done(null, customer); 
                   
                }   else{
                    console.log('nopppp');
                
                } }
                
            });
        }

        )
    );


/*
passport.serializeUser(function (customer, done) {
    done(null, customer.id);
});

passport.deserializeUser(function (id, done) {
    
    Model.findById(id, function (err, customer) {
        done(err, customer);
    });
} 
); */
passport.serializeUser(function (customer, done) {
    // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
    let userGroup = "Customer";
    let userPrototype =  Object.getPrototypeOf(customer);
    if (userPrototype === Customer.prototype) {
      userGroup = "Customer";
    } else if (userPrototype === Admin.prototype) {
      userGroup = "Admin";
    }
    let sessionConstructor = new SessionConstructor(customer.id, userGroup, '');
    done(null,sessionConstructor);
  });
  passport.deserializeUser(function (sessionConstructor, done) {
    if (sessionConstructor.userGroup == 'Customer') {
        Customer.findOne({
          _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
          done(err, user);
      });
    } else if (sessionConstructor.userGroup == 'Admin') {
      Admin.findOne({
          _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
          done(err, user);
      });
    }
  });
};