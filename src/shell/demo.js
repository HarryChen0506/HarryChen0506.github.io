const path = require('path')
const shell = require('shelljs')
const argv = require('./argv')
// console.log('argv', argv)

function createJsFile() {
  var content = `
    console.log('shellJs, good!111')
    console.log('hello, world!')
    console.log('当前时间', Date.now())
  `
  var dist = path.resolve(__dirname, './temp/c.js')
  touchFile(content, dist)
}
function createTempDir() {
  shell.mkdir('-p', path.resolve(__dirname, './temp'))
}
function removeTempDir() {
  shell.rm('-rf', path.resolve(__dirname, './temp/*'))
}
function getNodeInfo() {
  var version = shell.exec('node --version', {silent:true}).stdout
  console.log('version', version)
}
function readCliInfo() {
  console.log('process.argv', process.argv)
}

function initail() {
  // readCliInfo()
  // removeTempDir()
  // createTempDir()
  // createJsFile()
  // getNodeInfo()
}
initail()

// 公共函数
function touchFile(content, dist) {
  shell.echo(content).to(dist)
}


// const fs = require('fs-extra');
// const paths = require('../config/paths');
// const path = require('path')

// function copyDirect(from, to) {
//   fs.copy(from, to, {
//     overwrite: true,
//     dereference: true,
//     // filter: file => file !== '',
//     callback: function () {
//       console.log('拷贝成功！')
//     }
//   });
// }

// // 拷贝es规范-lib库
// copyDirect(paths.appLib, path.resolve(paths.appDist, 'es'))
// // 拷贝commonJs规范库入口文件-index.cjs.js
// copyDirect(path.resolve(paths.appLib, 'index.cjs.js'), path.resolve(paths.appDist, 'cjs/index.cjs.js'))
// // 拷贝style
// copyDirect(path.resolve(paths.appLib, 'style'), path.resolve(paths.appDist, 'style'))