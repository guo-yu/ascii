var fs = require('fs')
var Ascii = require('../dist')
var pic1 = new Ascii(__dirname + '/demo.jpg')
var pic2 = new Ascii(__dirname + '/demo2.jpg')

pic1.convert(function(err, result) {
  console.log(result)
})

setTimeout(function(){
  pic2.convert(function(err, result) {
    console.log(result)
  })
}, 1000)
