var nJwt=require("njwt");
function extractid(headers){
  var headerarr=headers.authorization.split(" ");
  var token=headerarr[1];
  var x=nJwt.verify(token,'7x0jhxt"9(thpX6');
  return x;
}
module.exports=extractid;