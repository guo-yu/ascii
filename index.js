//     ___              _ _ 
//    /   |  __________(_|_)
//   / /| | / ___/ ___/ / / 
//  / ___ |(__  ) /__/ / /  
// /_/  |_/____/\___/_/_/
//
// @author: [turing](http://guoyu.me);
// @desc: convert pictures to ascii arts based on node-canvas

var fs = require('fs');
var Canvas = require('canvas');
var ascii = require('./lib/ascii');

module.exports = Ascii;

function Ascii(src, params) {
  this.src = src;
}

Ascii.prototype.load = function(callback) {
  if (this.src) 
    return fs.readFile(this.src, callback);
  return callback(new Error('src picture required.'))
};

Ascii.prototype.convert = function(type, callback) {
  var t = (type && typeof(type) === 'string') ? type : 'cli';
  var cb = (typeof(type) === 'function' && !callback) ? type : callback;
  this.load(function(err, img) {
    if (err) return cb(err);
    var pic = new Canvas.Image;
    pic.src = img;
    var cv = new Canvas(pic.width, pic.height);
    var ctx = cv.getContext('2d');
    ctx.drawImage(pic, 0, 0, pic.width, pic.height);
    cb(null, ascii.init(t, ctx, pic));
  });
};

Ascii.fromBuffer = function(buffer) {
  var instance = new Ascii();
  instance.load = function(callback) {
    callback(null, buffer);
  };
  return instance;
};
