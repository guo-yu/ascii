'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //     ___              _ _
//    /   |  __________(_|_)
//   / /| | / ___/ ___/ / /
//  / ___ |(__  ) /__/ / /
// /_/  |_/____/\___/_/_/
//
// @author: [turing](http://guoyu.me);
// @desc: convert pictures to ascii arts based on node-canvas

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _canvas = require('canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _ascii = require('./ascii');

var _ascii2 = _interopRequireDefault(_ascii);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ascii = function () {
  function Ascii(src, params) {
    _classCallCheck(this, Ascii);

    this.src = src;
  }

  _createClass(Ascii, [{
    key: 'load',
    value: function load(callback) {
      if (this.src) return _fs2.default.readFile(this.src, callback);

      return callback(new Error('a src picture is required.'));
    }
  }, {
    key: 'convert',
    value: function convert(type, callback) {
      var t = type && typeof type === 'string' ? type : 'cli';
      var cb = typeof type === 'function' && !callback ? type : callback;

      this.load(function (err, img) {
        if (err) return cb(err);

        var pic = new _canvas2.default.Image();
        pic.src = img;

        var cv = new _canvas2.default(pic.width, pic.height);
        var ctx = cv.getContext('2d');
        var ascii = new _ascii2.default();

        ctx.drawImage(pic, 0, 0, pic.width, pic.height);
        cb(null, ascii.init(t, ctx, pic));
      });
    }
  }, {
    key: 'fromBuffer',
    value: function fromBuffer(buffer) {
      var instance = new Ascii();

      instance.load = function (callback) {
        callback(null, buffer);
      };

      return instance;
    }
  }]);

  return Ascii;
}();

exports.default = Ascii;