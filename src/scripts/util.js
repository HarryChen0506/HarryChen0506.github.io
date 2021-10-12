const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const ora = require('ora') // 动画效果
const chalk = require('chalk') // 字体加颜色
const symbols = require('log-symbols') // 图标
const download = require('download-git-repo')
const { rmDir } = require('../shell/command')

const cwd = process.cwd()
const TEMP_DIR = '_temp'

// 前处理
function preprocess() {
  if (fs.existsSync(TEMP_DIR)) {
    rmDir(path.resolve(cwd, TEMP_DIR))
  }
}

// 下载git项目
function downloadProject({ url, dest, options = {}, onError, onSuccess }) {
  const spinner = ora('start download ...')
  spinner.start()
  download(url, dest, options, err => {
    if (err) {
      spinner.fail()
      console.log(symbols.error, chalk.red(err))
      typeof onError === 'function' && onError(err)
      return
    }
    spinner && spinner.succeed()
    console.log(symbols.success, chalk.green('The repo has downloaded successfully!', url))
    typeof onSuccess === 'function' && onSuccess()
  })
}

// 下载repo
function downloadRepo({
  repoUrl,
  repoName,
  onSuccess
}) {
  const REPO_DEST = path.resolve(cwd, TEMP_DIR, repoName)
  //检查控制台是否以运行`git `开头的命令
  if (!shell.which('git')) {
    //在控制台输出内容
    shell.echo('Sorry, this script requires git')
    shell.exit(1)
    return
  }
  preprocess()
  downloadProject({
    url: repoUrl,
    dest: REPO_DEST,
    onSuccess: function () {
      typeof onSuccess === 'function' && onSuccess()
    },
    onError: function () {
      shell.exit(1)
    }
  })
}

module.exports.downloadRepo = downloadRepo
module.exports.TEMP_DIR = TEMP_DIR