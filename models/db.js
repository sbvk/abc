const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/CustomerDB',{useNewUrlParser:true},(err)=>{
    if(!err) {console.log('conn succeeded')}
    else{ console.log('Error in conn:'+ err)}
});
require('./employee.model');
require('./photo.model');