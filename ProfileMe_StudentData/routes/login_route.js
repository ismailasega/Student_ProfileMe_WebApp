const express = require('express');
const passport = require('passport')
const router = express.Router();

//Render Selction Page 
router.get('/login', (req, res)=>{
    res.render('login_page', {status:''});
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}),(req,res)=>{
    req.session.user = req.user;
    res.redirect('/Option');
});

//Logout
router.get('/logout', (req, res)=>{
  if(req.session){
    req.session.destroy(function (err){
      if(err){
        throw err
      }else{
        return res.redirect('/login')
      }
    });
  }
});


module.exports = router;