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
    date:{
        type:String
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}
);
mongoose.model('Customer',employeeSchema);
