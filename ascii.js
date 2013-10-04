// 感谢这篇文章的启发 [基于canvas将图片转化成字符画](http://www.cssha.com/img2txt-canvas)

var Ascii = {
    style: "<style type='text/css'>* {margin: 0;padding: 0;} .ascii {font-size: 12px;font-family: simsun;}</style>",
    // 按照不同的终端输出
    types: {
        cli: {
            br: '\n',
            blank: ' '
        },
        html: {
            br: '</br>',
            blank: '&nbsp;'
        }
    },
    // 根据灰度生成相应字符
    toText: function(type, g) {
        var self = this;
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
            return self.types[type].blank;
        }
    },
    // 根据rgb值计算灰度
    getGray: function(r, g, b) {
        return 0.299 * r + 0.578 * g + 0.114 * b;
    },
    // 初始化
    init: function(type, ctx, pic) {
        var self = this,
            data = ctx.getImageData(0, 0, pic.width, pic.height),
            text = '';
        for (h = 0; h < data.height; h += 12) {
            var p = '';
            for (w = 0; w < data.width; w += 6) {
                var index = (w + data.width * h) * 4;
                var r = data.data[index + 0];
                var g = data.data[index + 1];
                var b = data.data[index + 2];
                var gray = self.getGray(r, g, b);
                p += self.toText(type, gray);
            }
            p += self.types[type].br;
            text += p;
        }
        return (type === 'html') ? self.style + "<div class='ascii'>" + text + '</div>' : text;
    }
}

module.exports = Ascii;