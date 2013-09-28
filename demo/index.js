var Ascii = require('../index');
var pic = new Ascii(__dirname + '/demo.jpg');
var fs = require('fs');

pic.convert(function(err, result) {
    console.log(result);
    // fs.writeFile('demo.html', result);
});