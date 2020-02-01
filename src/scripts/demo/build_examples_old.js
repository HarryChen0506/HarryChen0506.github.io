const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const handlebars = require('handlebars') // 文件compile
const ora = require('ora') // 动画效果
const chalk = require('chalk') // 字体加颜色
const symbols = require('log-symbols') // 图标
const download = require('download-git-repo')
const argv = require('../shell/argv')
const { touch, mkFile, mkDir, rmDir, copyDir } = require('../shell/command')
// console.log('argv', argv)
// console.log('__dirname', __dirname)
// console.log('process.cwd', process.cwd())

const cwd = process.cwd()

//检查控制台是否以运行`git `开头的命令
if (!shell.which('git')) {
  //在控制台输出内容
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}
const TEMP_DIR = 'temp'
const REPO_URL = 'github:HarryChen0506/malyan'
const REPO_NAME = 'malyan'
const REPO_DEST = path.resolve(cwd, TEMP_DIR, REPO_NAME)
const TARGET_DIR = 'examples'

// 下载git项目
function downloadProject({ url, dest, onError, onSuccess }) {
  const spinner = ora('start download ...')
  spinner.start()
  download(url, dest, err => {
    if (err) {
      spinner.fail()
      console.log(symbols.error, chalk.red(err))
      typeof onError === 'function' && onError(err)
      return
    }
    spinner && spinner.succeed()
    // const fileName = `${name}/package.json`;
    // const meta = {
    //   name,
    //   description: answers.description,
    //   author: answers.author
    // }
    // if (fs.existsSync(fileName)) {
    //   const content = fs.readFileSync(fileName).toString();
    //   const result = handlebars.compile(content)(meta);
    //   fs.writeFileSync(fileName, result);
    // }
    console.log(symbols.success, chalk.green('The repo has downloaded successfully!'))
    typeof onSuccess === 'function' && onSuccess()
  })
}
// 清除旧目录
function cleanOldDir() {
  const target = path.resolve(cwd, TARGET_DIR)
  if (fs.existsSync(target)) {
    rmDir(target)
    console.log(symbols.success, chalk.green('clean old directions successfully!'))
  }
}
// 拷贝目标文件夹
function copyTargetDir() {
  const from = path.resolve(REPO_DEST, TARGET_DIR)
  const to = path.resolve(cwd, TARGET_DIR)
  // console.log('from', from)
  // console.log('to', to)
  copyDir(from, to)
}
// 移除缓存
function removeTemp() {
  const target = path.resolve(cwd, TEMP_DIR)
  if (fs.existsSync(target)) {
    rmDir(target)
    console.log(symbols.success, chalk.green('remove temp successfully!'))
  }
}
// 前处理
function preprocess() {
  if (fs.existsSync(TEMP_DIR)) {
    rmDir(path.resolve(cwd, TEMP_DIR))
  }
}
function afterDownload() {
  cleanOldDir()
  copyTargetDir()
  removeTemp()
  console.log(symbols.success, chalk.green('project has built successfully!'))
}
// 下载repo
function init() {
  console.log('build exampels')
  preprocess()
  downloadProject({
    url: REPO_URL,
    dest: REPO_DEST,
    onSuccess: function () {
      afterDownload()
    },
    onError: function () {
      shell.exit(1)
    }
  })
}

init()

// if (fs.existsSync(TEMP_DIR)) {
//   rmDir(path.resolve(cwd, TEMP_DIR))
// } else {
//   const spinner = ora('start...')
//   spinner.start()
//   mkDir(path.resolve(cwd, TEMP_DIR))
//   mkFile('hello harry', path.resolve(cwd, TEMP_DIR, './123.js'))
//   touch(path.resolve(cwd, TEMP_DIR, './hello.js'))
//   setTimeout(() => {
//     spinner.succeed()
//     console.log(symbols.success, chalk.green('The object has installed dependence successfully!'))
//   }, 2000)
// }
