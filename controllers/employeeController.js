const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');
const Image=mongoose.model('Image');
const bcrypt=require('bcrypt-nodejs');
var emp=new Image();
router.get('/',(_req,res)=>{
    res.render("employee/addOrEdit",{
        
    });

});
router.post('/',(req,res)=>{
    insertRecord(req,res);

});

function insertRecord(req,res){
    var employee=new Customer();
    employee.date=new Date();
    employee.firstname=req.body.firstname;
    employee.lastname=req.body.lastname;
    employee.contact=req.body.contact;
    employee.email=req.body.email;
    employee.password=req.body.password;
    bcrypt.genSalt(10, function(salt) {
    bcrypt.hash(employee.password, salt,null, function(err, hash) {
        if (err) {
            return next(err);
        }
        employee.password = hash;
      });
    });
    
    var query=req.body.email;
    
    Customer.findOne({email:query},function(err, doc){
        if(err) console.log(err);
        if (doc){
        console.log('This has already been saved');
        res.send('in use')
        } else {
        employee.save((err,doc)=>{
            if(!err)
                res.render('employee/dashb')
            else{
                console.log('error in record inser:'+err);
                }
        },);
    }
        
    /*employee.save((err,doc)=>{
        if(!err)
            res.render('employee/dashb')
        else{
            console.log('error in record inser:'+err);
            }
    });*/
});
}





  
module.exports=router;