const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Admin1=mongoose.model('Admin');
const Admin=require('../models/admin.model');
const { ensureAuthenticated } = require('../config/checkAuth1');
router.get('/',ensureAuthenticated,(req,res)=>{

res.render('pass1/pass');

});

router.post('/pass2',ensureAuthenticated,(req,res)=>{
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
                            req.flash('success','Password changed successfully!' );
                            req.logout();
                            res.redirect('/admin');
                        } 
                    });

            }
            else
            {   
                req.flash('error','New and confirm passwords dont match' );
                  console.log("passwords dont match");
                  res.redirect('/pass');
            }
          }else {
            req.flash('error','Current password is wrong' );
            console.log("current password wrong,",);
              res.redirect('/pass');
          }
       
      }
    })
    //.sort(mysort)
});

module.exports=router;