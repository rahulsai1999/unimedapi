var mongoose = require("mongoose");

var doctorSchema = new mongoose.Schema({
    name:String
});

module.exports = mongoose.model("Doctor", doctorSchema);