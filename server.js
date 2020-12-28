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
const ind=require('./controllers/index');
const ind1=require('./controllers/index1');
const auth=require('./controllers/auth');
const fs = require('fs');
const bcrypt=require('bcryptjs');
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
app.use('/ind',ind);
app.use('/auth',auth);
app.use('/ind1',ind1);
