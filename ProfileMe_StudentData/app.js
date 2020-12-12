//Requiring dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

//Declearing routes
const StudentDataRoutes =require('./routes/studentData_route');
const loginRoutes = require('./routes/login_route')

//Requiring User model for passport authentication
const User =require('./models/Users')

//Initilising app
const app =express();

//Passport
const passport = require('passport')
const expressSession =require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

//MongoDB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
  });

mongoose.connection
.on('open', () => {
console.log('Mongoose connection open');
})
.on('error', (err) => {
console.log(`Connection error: ${err.message}`);
});

//Middleware to be able to use form data
app.use(bodyParser.urlencoded({extended: true}));

//Tellin the App to use folders and files within the public folder 
app.use(express.static('public'));

//passport config
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

//connecting Passport to schema
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Path
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Telling App to use routes delcared in the routes folder 
app.use('/', StudentDataRoutes);
app.use('/', loginRoutes)

//Handling non-existant route / path
app.get('*', (req,res)=>{
    res.send('404! Invalid Request')
  });

  
//Creating a server and listening port 3000
app.listen(4000, ()=> console.log('listening on port 4000'));