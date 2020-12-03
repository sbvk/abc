const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Admin1=mongoose.model('Admin');
const Admin=require('../models/admin.model');
router.get('/',(req,res)=>{

res.render('pass1/pass');

});

router.post('/pass2',(req,res)=>{
   var id=req.user._id;
    Admin1.find(id,(err,docs)=>{
      if(err) {
          console.log(err);
      }
      else {
         
          if(req.user.password==req.body.current)
          {
            if(req.body.new==req.body.confirm)
            {
                Admin1.findByIdAndUpdate(id, 
                    {
                        password: req.body.new
                    },  function (err, docs) { 
                        if (err){ 
                            console.log(err) 
                        } 
                        else{ 
                            console.log("Updated Password : ", docs); 
                            res.render('pass1/passer');
                        } 
                    });

            }
            else
            {   
                req.flash('confirm','New and confirm passwords dont match' );
                res.send(req.flash('confirm'));
                console.log("passwords dont match");
            }
          }else {
            req.flash('pass','Current password is wrong' );
            res.send(req.flash('pass'));
              console.log("current password wrong,",);
              //res.redirect('/pass');
          }
       
      }
    })
    //.sort(mysort)
});

module.exports=router;