var router=require("express").Router();
var unirest=require("unirest");

router.post("/foodsearch",function(req,res){
    var recipedata=req.body.foodname;
    console.log(recipedata);
    var arr=recipedata.split(" ");
    var final=arr.join("+");
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/guessNutrition?title="+final)
    .header("X-RapidAPI-Key", "3693a95678msh1bbea2b9a15438ap1298e1jsn7afbfc9627b6")
    .end(function (result) {
    res.json(result.body);
    });
});

module.exports=router;