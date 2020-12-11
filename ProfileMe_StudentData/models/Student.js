const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    surname:String,
    givenName:String,
    gender:String,
    dob:String,
    country:String,
    residence:String,
    phone:String,
    email:String,
    skills:[{type: String}],
    projects:[{type: String}],
    ProfilePic:String,

});

module.exports = mongoose.model('student', studentSchema)