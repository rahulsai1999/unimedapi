var router=require("express").Router();
var fs = require('fs-extra');
var multer = require('multer');
var upload = multer({dest: './uploads/'});
var apikey="AIzaSyCKlCwQFlHDVQDny9uGUITTSAFotz3sG0o";
var request=require("request");

var form = '<!DOCTYPE HTML><html><body>' +
  "<form method='post' action='/imgupload' enctype='multipart/form-data'>" +
  "<input type='file' name='image'/>" +
  "<input type='submit' /></form>" +
  '</body></html>';

router.get("/",function(req,res){
  res.send("<h1>See documentation</h1><br><a href='https://documenter.getpostman.com/view/5649815/Rztpp7JT'>Link</a>");
});

router.get('/image', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(form);
});

// Get the uploaded image
// Image is uploaded to req.file.path
router.post('/imgupload', upload.single('image'), function(req, res, next) {

  // Choose what the Vision API should detect
  // Choices are: faces, landmarks, labels, logos, properties, safeSearch, texts
  var file=req.file.path;
  var url="https://vision.googleapis.com/v1/images:annotate?key="+apikey;
  
  var options = {
    url: url,
    method:'POST',
    json:{
        "requests":[
          {
            "image":{
              "content": new Buffer(fs.readFileSync(file)).toString("base64")
            },
            "features":[
              {
                "type":"LABEL_DETECTION"
              }
            ]
          }
        ]
      }      
  };
   
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)    
    }
  }
   
  request(options, callback);
  //fs.remove(file);

});



module.exports=router;