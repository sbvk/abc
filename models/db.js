const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://sbvk:atlas123@abc.fxne0.mongodb.net/CustomerDB',{useNewUrlParser:true, useUnifiedTopology: true},(err)=>{
    if(!err) {console.log('conn succeeded')}
    else{ console.log('Error in conn:'+ err)}
});
require('./employee.model');
require('./photo.model');
require('./admin.model');
require('./contactus.model');
require('./order.model');
require('./wishlist.model');