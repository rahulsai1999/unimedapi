var router=require("express").Router();
var medicine=require("../models/med");

router.post("/add",function(req,res){
    var meed=new medicine({
        name:req.body.name,
        manuf:req.body.manuf,
        price:req.body.price,
        constit:req.body.constit,
        sched:req.body.sched,
        sidef:req.body.sidef,
        work:req.body.work,
        usedfor:req.body.usedfor
    });
    
    medicine.create(meed,function(err,ss){
        if(err)
        console.log(err);
        else
        res.json(ss);
    });
});

router.get("/search/:name",function(req,res){
    var querye=req.params.name;
    medicine.findOne({name:querye},function(err,sss){
        if(err)
        console.log(err);
        else
        res.json(sss)
    });
});


module.exports=Router;