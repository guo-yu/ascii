var Ascii = require('../index');
var pic = new Ascii(__dirname + '/demo.png');
var fs = require('fs');

pic.convert(function(err, result) {
    console.log(result);
    // var style = '<style> * {margin: 0;padding: 0;} body {font-size: 12px; margin: 10px; font-family: simsun; background: #fff;} p { height: 12px;}</style>';
    // fs.writeFile('demo.html', result);
});