const mongoose=require('mongoose');

var employeeSchema=new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    contact:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
}
);
mongoose.model('Customer',employeeSchema);
