var Ascii = require('../index');
var pic1 = new Ascii(__dirname + '/demo.jpg');
var pic2 = new Ascii(__dirname + '/demo2.jpg');
var fs = require('fs');

pic1.convert(function(err, result) {
  console.log(result);
  // fs.writeFile('demo.html', result);
});

setTimeout(function(){
  pic2.convert(function(err, result) {
    console.log(result);
    // fs.writeFile('demo.html', result);
  });  
}, 1000);
