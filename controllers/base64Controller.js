const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
var emp=new Image();
var THREE = require('three');
var FBXLoader = require('three-fbx-loader');
const { findById } = require('../models/photo.model');
var loader = new FBXLoader(); 
var scene = new THREE.Scene();

router.get('/',(_req,res)=>{ var mysort = { date: -1 };
    Image.find({}, (err, results) => {
        if (err) throw err
        var thumb = []
        var cap = []
       
        for (var result of results) {
            thumb.push(result);
            //cap.push(result.img.data.toString('base64'));
            //cap.push(result.name);
        }
        res.render('base/3dm', {
            thumb
            
            //cap: cap
           
        })
      })
    /*
    Image.findById('5f92802573b14f5e64635327', function(err, result) {
        if (err) throw (err);
    
        var thumb = result.img.data.toString('base64');
        res.render('base/3dm', {img: thumb});
        //loader.load('C:/Users/Admin/web1/views/base/eyeball.fbx', function (object) { scene.add(object) });
       
       
    });*/
    
});

module.exports=router;