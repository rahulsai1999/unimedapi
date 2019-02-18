var router=require("express").Router();
var isLoggedIn=require("./middleware")
var extractid=require("./extract");
var Patient=require("../models/patient");
var Session=require("../models/session");
var Doctor=require("../models/doctor");

router.post("/create",isLoggedIn,function(req,res,next){
  var x=extractid(req.headers);
  var y=req.body.docid;
  
  var sess=new Session({
    isactive:true,
    date:new Date(),
    patid:x.id,
    docid:y
  });
  
  Session.create(sess,function(err,obj){
    if(err)
    res.json("err");
    else{
      var objid=obj.id;
      Patient.findById(obj.patid,function(err,fp){
        if(err)
        console.log(err)
        else{
          Doctor.findById(obj.docid,function(err,fd){
            if(err)
            console.log(err)
            else{
              var m1="Hi "+fp.name+", Your Session with "+fd.name+"is active now.";
              var m2="Session iD: "+objid;
              res.json({message1:m1,message2:m2});
            }
          });
        }
      });
    }
  });

});

module.exports=router;