require('./models/db');
require('./models/photo.model');
require('./models/admin.model');
require('./models/filter.model');
const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');
const multer=require('multer');
const employeeController=require('./controllers/employeeController');
const picController=require('./controllers/picController');
const base64Controller=require('./controllers/base64Controller');
const listController=require('./controllers/listController');
const userloginController=require('./controllers/userloginController');
const adminController=require('./controllers/adminController');
const contactusController=require('./controllers/contactusController');
const contactlistController=require('./controllers/contactlistController');
const cartController=require('./controllers/cartController');
const cart1Controller=require('./controllers/cart1Controller');
const icartController=require('./controllers/icartController');
const icart1Controller=require('./controllers/icart1Controller');
const wishController=require('./controllers/wishController');
const orderController=require('./controllers/orderController');
const myorderController=require('./controllers/myorderController');
const allordersController=require('./controllers/allordersController');
const delController=require('./controllers/delController');
const passController=require('./controllers/passController');
const editController=require('./controllers/editController');
const userpassController=require('./controllers/userpassController');
const filterController=require('./controllers/filterController');
const forgotController=require('./controllers/forgotController');
const resetController=require('./controllers/resetController');
const ind=require('./controllers/index');
const ind1=require('./controllers/index1');
const auth=require('./controllers/auth');
const fs = require('fs');
const bcrypt=require('bcrypt-nodejs');
const { ppid } = require('process');
const passport= require('passport');
var flash=require('connect-flash');
//var flash = require('req-flash');
const session=require('express-session');
const mongoose=require('mongoose');
var MongoStore=require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var app=express();
require('./config/passport')(passport);
var nodemailer = require('nodemailer');
var async = require('async');

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave:false,
    saveUninitialized:false,
    store:new MongoStore({mongooseConnection:mongoose.connection}),
    cookie:{maxAge:100*60*1000}
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(function(req,res,next){
res.locals.success=req.flash('success');
//res.locals.error=req.flash('error_msg');
res.locals.error=req.flash('error');
res.locals.message=req.flash('message');
res.locals.login=req.isAuthenticated();
res.locals.session=req.session;
//res.locals.error=req.flash('pass');
next();
});

app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());
app.use(express.static(__dirname+'/'))

app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine','hbs');

app.listen(process.env.PORT || 3000,function(){
    console.log('express server started at port:3000');
});

var Filter=mongoose.model('Filter');
const Customer=mongoose.model('Customer');
var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now())
    }
});
var upload=multer( {
    storage:storage
});
var imgModel = require('./models/photo.model');
const { data } = require('jquery');
const { timeStamp } = require('console');

const Image=mongoose.model('Image');
app.get('/upl', (req, res) => { 
    Image.find({}, (err, items) => { 
        var cap1 = [];
        var mysort = { name: 1 };
        if (err) { 
            console.log(err); 
        } 
        else {  
            
            for (var result of items) {
              var thumb=result.img.data.toString('base64');
            var name=result.name;
            var desc=result.desc;
            var price=result.price;
            var filter=result.filter;
            }
            Filter.find(function(err,docu){
                if (err) console.log(err);
                else for (var result1 of docu) {
                    cap1.push(result1);    
                }
            res.render('pic/3dmodel', { item: thumb, name:name, desc:desc, price:price, filter:filter, cap1 }); 
            }).sort(mysort);
            
        } 
    }); 
});


app.post('/uploadfile', upload.single('image'), (req, res, next) => { 
  
    var obj = { 
        name: req.body.name, 
        desc: req.body.desc, 
        price: req.body.price,
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/fbx',
            base: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)).toString('base64')
        },
        filter:req.body.filters,
        date: new Date(),
        
    } 
    imgModel.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // item.save(); 
            
            res.redirect('/upl'); 
        } 
    }); 
}); 
/*
app.post('/uploadmultiple', upload.array('myFiles',20),(req,res,next)=>{
    const files=req.files;
    if(!files){
        const error=new Error("pls up");
        error.httpStatusCode=400;
        return next(error);
    }
    res.send(files);
}) */

app.get('/reset/:token', function(req, res) {
    Customer.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/');
      } 
      res.render('forgot/reset.hbs', {
        user: req.user
      });
    });
  });
  app.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        Customer.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
          }
          if(req.body.password==req.body.confirm)
             { bcrypt.genSalt(10, function(salt) {
                 bcrypt.hash(req.body.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }
            
          user.password = hash;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
  
          user.save(function(err) {
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
        })
    })
}
else 
{
    return res.render('forgot/reset.hbs',{
        error:'New and confirm passwords dont match'
    });
}
        });
      },
      function(user, done) {
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
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          res.redirect('/login');
          done(err);
        });
      }
    ], function(err) {
        req.flash('error','Error in recovering password')
        res.redirect('/login');
    });
  });

app.use('/employee',employeeController);
app.use('/pic',picController);
app.use('/base',base64Controller);
app.use('/list',listController);
app.use('/login',userloginController);
app.use('/admin',adminController);
app.use('/con',contactusController);
app.use('/conlist',contactlistController);
app.use('/cart',cartController);
app.use('/cart1',cart1Controller);
app.use('/icart',icartController);
app.use('/icart1',icart1Controller);
app.use('/wish',wishController);
app.use('/ord',orderController);
app.use('/myord',myorderController);
app.use('/all',allordersController);
app.use('/dele',delController);
app.use('/pass',passController);
app.use('/edit',editController);
app.use('/userpass',userpassController);
app.use('/filter',filterController);
app.use('/forgot',forgotController);
app.use('/reset',resetController);
app.use('/ind',ind);
app.use('/auth',auth);
app.use('/ind1',ind1);
