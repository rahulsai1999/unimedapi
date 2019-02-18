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
    patid:x,
    docid:y
  });
  
  Session.create(sess,function(err,obj){
    if(err)
    res.json("err");
    else{
      var patientf=Patient.findById(obj.patid);
      var doctorf=Doctor.findById(obj.docid);
      var objid=obj.id;
      var finalobj={pname:patientf.name,dname:doctorf.name,sessid:objid};
      res.json(finalobj);
    }
  });

});

module.exports=router;