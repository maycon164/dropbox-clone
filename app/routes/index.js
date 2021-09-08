var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res) => {
  
  let form = formidable({
    uploadDir: './uploadFiles',
    keepExtensions: true,
    multiples: true
  });

  form.parse(req, (error, fields,  files) => {
    console.log(error);
    console.log(fields);
    console.log(files);
  });

});


module.exports = router;