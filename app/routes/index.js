var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/file', (req, res) => {
    
  let form = formidable({
    uploadDir: './uploadFiles',
    keepExtensions: true,
    multiples: true
  });

  form.parse(req, (error, fields,  files) => {
    let path = "./" + fields.path;

    if(fs.existsSync(path)){
      
      fs.unlink(path, error => {
        
        if(error) {
          
          res.status(400).json({
            error
          })

        }else{
          res.json({
            fields
          });
        }

      })

    }

  });
})

router.post('/upload', (req, res) => {
  
  let form = formidable({
    uploadDir: './uploadFiles',
    keepExtensions: true,
    multiples: true
  });

  form.parse(req, (error, fields,  files) => {
    
    if(!error){
      res.json({
        files
      });
    }else{
      res.json({error});
    }
 

  });

});


module.exports = router;