var mongoose = require("mongoose");

var doctorSchema = new mongoose.Schema({
    name:String,
    DOB: String,
    gender:String,
    yrsexp:String,
    email: String,
    username: String,
    password:String,
    profileimg:String
});

module.exports = mongoose.model("Doctor", doctorSchema);