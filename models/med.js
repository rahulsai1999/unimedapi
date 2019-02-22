var mongoose = require("mongoose");

// POST - title, content
var medSchema = new mongoose.Schema({
   name: String,
   manuf: String,
   price: String,
   constit: String,
   sched:String,
   sidef:String,
   work:String,
   usedfor:String
});

module.exports = mongoose.model("Med", medSchema);