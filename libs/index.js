//     ___              _ _
//    /   |  __________(_|_)
//   / /| | / ___/ ___/ / /
//  / ___ |(__  ) /__/ / /
// /_/  |_/____/\___/_/_/
//
// @author: [turing](http://guoyu.me);
// @desc: convert pictures to ascii arts based on node-canvas

import fs from 'fs'
import Canvas from 'canvas'
import asciiFromCanvas from './ascii'

export default class Ascii {
  constructor(src, params) {
    this.src = src
  }

  load(callback) {
    if (this.src)
      return fs.readFile(this.src, callback)

    return callback(new Error('a src picture is required.'))
  }

  convert(type, callback) {
    let t = (type && typeof(type) === 'string') ? type : 'cli'
    let cb = (typeof(type) === 'function' && !callback) ? type : callback

    this.load((err, img) => {
      if (err)
        return cb(err)

      var pic = new Canvas.Image
      pic.src = img

      var cv = new Canvas(pic.width, pic.height)
      var ctx = cv.getContext('2d')
      var ascii = new asciiFromCanvas

      ctx.drawImage(pic, 0, 0, pic.width, pic.height)
      cb(null, ascii.init(t, ctx, pic))
    })
  }

  fromBuffer(buffer) {
    let instance = new Ascii()

    instance.load = function(callback) {
      callback(null, buffer)
    }

    return instance
  }
}
