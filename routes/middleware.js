var passport=require("passport")

function isLoggedIn(req,res,next){
passport.authenticate('jwt',function (err, user, info) {
  if (err) {
    res.json(err);
  }
  if (!user) {
    res.json({ error: 'Invalid credentials.' });
  }
  if (user) {
    next();
  }
})(req, res, next);
}

module.exports=isLoggedIn;