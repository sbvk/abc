const mongoose=require('mongoose');

var adminSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
    
}
);
mongoose.model('Admin',adminSchema);
