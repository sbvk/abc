const mongoose=require('mongoose');

var contactSchema=new mongoose.Schema({
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
    message:{
        type:String
    },
    date:{
        type:String
    }
}
);
mongoose.model('Contactus',contactSchema);
