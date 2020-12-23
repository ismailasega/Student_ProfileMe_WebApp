const express = require('express');
const path = require('path');
const multer =require('multer');
const router = express.Router();

const student = require('../models/Student')
const User = require('../models/Users')

//Setting image upload storage engine
const storage = multer.diskStorage({
    destination: './public/ProfilePics/',
    filename:(req, file, cb)=>{
      //amenind  timestamp on an image that is same as the other
      cb(null, file.fieldname + '-' + Date.now() + 
      path.extname(file.originalname));
    }
});
  
//Image upload
const upload = multer({
storage: storage,
}).single('ProfilePic');

//Render registarion form  
router.get('/StudentData', (req, res)=>{
    if(req.session.user){
        res.render('RegStudent_page', {status2:''});
    }else{
        res.redirect('/login')
    }
});

//Render Selction1 Page 
router.get('/Option', (req, res)=>{
    if(req.session.user){
        res.render('Selection1_page', {status:''});
    }else{
        res.redirect('/login')
    }
});


//Render Selction Page 
router.get('/selectOption', (req, res)=>{
    if(req.session.user){
        res.render('Selection_page', {status:''});
    }else{
        res.redirect('/login')
    }
});

//Creating user credentials
router.post('/user', async(req,res)=>{
    try{
        const user = new User(req.body);
        await User.register(user, req.body.password, (err)=>{
            if (err){
                throw err
            }
            res.redirect('/login')
        })
    }catch(err){
        res.status(400).send("Failed to add user");
    }
});
  

//Posting student details to DB
router.post('/RegStudent', upload, async(req, res)=>{
    if(req.session.user){
        try{
            const StudentDetails = new student(req.body);
            StudentDetails.ProfilePic=req.file.filename;
            await StudentDetails.save();
            res.render('Selection_page', {status:'Data has been successfully submitted'});
        }catch(err){
            res.render('RegStudent_page', {status2:'Problem encountered while submitting this form'});
        }
    }else{
        res.redirect('/login');
    }
});

//Retriving  student details from DB
router.get('/Students', async(req, res)=>{
    if(req.session.user){
        try{
        const studentDetails = await student.find();
        res.render('students_page',{students: studentDetails});
        }catch(err){
            res.render('RegStudent_page', {status2:'Failed to retrive student details'});
        }
    }else{
        res.redirect('/login');
    }
});

//Render profile Page 
router.get('/viewProfile/:id', async(req, res)=>{
    if(req.session.user){
        try{
            const studentProfile = await student.findOne({_id:req.params.id});
            res.render('StudentProfile_page', {Profile: studentProfile});
        }catch(err){
            res.status(400).send("unable to find student data");
        }
    }else{
        res.redirect('/login');
    }
});

//Deleting Student Data
router.post('/deleteStudent', async(req, res)=>{
    if(req.session.user){
        try{
            await student.deleteOne({_id: req.body.id});
            res.redirect('back');
        }catch(err){
            res.status(400).send("unable to delete stduent details")
        }
    }else{
        res.redirect('/login');
    }
});

module.exports = router;