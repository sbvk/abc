module.exports={
    ensureAuthenticated:function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','pls login');
        res.redirect('/login');
    },
    forwardAuthenticated:function(req,res,next){
        if(!req.isAuthenticated()){
            return next();

        }
        res.redirect('/dashboard');
    }
};