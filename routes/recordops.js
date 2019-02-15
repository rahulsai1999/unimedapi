var router=require("express").Router();
var isLoggedIn=require("./middleware")
var extractid=require("./extract");
var User=require("../models/user");
var Records=require("../models/records");


router.post('/add',isLoggedIn,function(req,res){
    var x=extractid(req.headers);
    var obj=req.body;
    var record=new Records({
        timestamp:x.body.id+" "+new Date().toLocaleDateString('en-GB', {day : 'numeric',month : 'numeric',year : 'numeric'}),
        bdesc:obj.bdesc,
        bcalories:obj.bcal,
        bfat:obj.bfat,
        bprotein:obj.bprot,
        bcarbs:obj.bcarbs,
        ldesc:obj.ldesc,
        lcalories:obj.lcal,
        lfat:obj.lfat,
        lprotein:obj.lprot,
        lcarbs:obj.lcarbs,
        ddesc:obj.ddesc,
        dcalories:obj.dcal,
        dfat:obj.dfat,
        dprotein:obj.dprot,
        dcarbs:obj.dcarbs,
    });
    Records.create(record,function(err,newrec){
        if(err){res.json("Error creating object");}
        else
        {
            res.json(newrec);
        }
    });
});

router.get('/disp',isLoggedIn,function(req,res){
    var x=extractid(req.headers);
    var dategiv=req.body.dategiv;
    var findkey=x.body.id+" "+dategiv;
    Records.findOne({timestamp:findkey},function(err,found){
        if(err){res.json("Record not found");}
        else{res.json(found);}
    });
});

module.exports=router;