'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 感谢这篇文章的启发 [基于canvas将图片转化成字符画](http://www.cssha.com/img2txt-canvas)

var asciiFromCanvas = function () {
  function asciiFromCanvas() {
    _classCallCheck(this, asciiFromCanvas);

    this.style = "<style type='text/css'>* {margin: 0;padding: 0;} .ascii {font-size: 12px;font-family: simsun;}</style>";
    // 按照不同的终端输出
    this.types = {
      cli: {
        br: '\n',
        blank: ' '
      },
      html: {
        br: '</br>',
        blank: '&nbsp;'
      }
    };
  }

  // 根据灰度生成相应字符


  _createClass(asciiFromCanvas, [{
    key: 'toText',
    value: function toText(type, g) {
      if (g <= 30) {
        return '#';
      } else if (g > 30 && g <= 60) {
        return '&';
      } else if (g > 60 && g <= 120) {
        return '$';
      } else if (g > 120 && g <= 150) {
        return '*';
      } else if (g > 150 && g <= 180) {
        return 'o';
      } else if (g > 180 && g <= 210) {
        return '!';
      } else if (g > 210 && g <= 240) {
        return ';';
      } else {
        return this.types[type].blank;
      }
    }

    // 根据rgb值计算灰度

  }, {
    key: 'getGray',
    value: function getGray(r, g, b) {
      return 0.299 * r + 0.578 * g + 0.114 * b;
    }

    // 初始化

  }, {
    key: 'init',
    value: function init(type, ctx, pic) {
      var data = ctx.getImageData(0, 0, pic.width, pic.height);
      var text = '';

      for (h = 0; h < data.height; h += 12) {
        var p = '';
        for (w = 0; w < data.width; w += 6) {
          var index = (w + data.width * h) * 4;
          var r = data.data[index + 0];
          var g = data.data[index + 1];
          var b = data.data[index + 2];
          var gray = this.getGray(r, g, b);
          p += this.toText(type, gray);
        }
        p += this.types[type].br;
        text += p;
      }

      return type === 'html' ? this.style + "<div class='ascii'>" + text + '</div>' : text;
    }
  }]);

  return asciiFromCanvas;
}();

exports.default = asciiFromCanvas;