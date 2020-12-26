module.exports={
    ensureAuthenticated:function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error','Please login to continue');
        res.redirect('/admin');
    },
    forwardAuthenticated:function(req,res,next){
        if(!req.isAuthenticated()){
            return next();

        }
         res.redirect('/dashboard1');
    }
};