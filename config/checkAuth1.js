module.exports={
    ensureAuthenticated:function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','pls login');
        res.send(req.flash('error_msg'));
        res.redirect('/admin');
    },
    forwardAuthenticated:function(req,res,next){
        if(!req.isAuthenticated()){
            return next();

        }
         res.redirect('/dashboard1');
    }
};