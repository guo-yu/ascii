var Ascii = require('../index');
var pic = new Ascii(__dirname + '/demo2.jpg');
var fs = require('fs');

pic.convert(function(err, result) {
    console.log(result);
    // fs.writeFile('demo.html', result);
});