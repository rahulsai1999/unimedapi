var router=require("express").Router();
var Doctor=require("../models/doctor");
var mongoose=require("mongoose");
var shortid=require("shortid");

router.post("/create",function(req,res){

    var Doc=new Doctor({
        name:req.body.name
    });

    Doctor.create(Doc,function(err,obj){
        if(err)
        res.json("err");
        else
        res.json(obj);
    });
});

module.exports=router;