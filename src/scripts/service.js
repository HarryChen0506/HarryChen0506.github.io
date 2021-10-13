// const child_process = require('child_process')
const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const symbols = require('log-symbols')
const ora = require('ora')
const chalk = require('chalk')
const { rmDir, mkDir, copyDir } = require('../shell/command')

const cwd = process.cwd()
const TEMP_DIR = '_temp'
const TEMP_DEST = path.resolve(cwd, TEMP_DIR)

/* ------ 下载 ------*/
const downloadRepo = ({ repoUrl } = {}) => {
  //检查控制台是否以运行`git `开头的命令
  if (!shell.which('git')) {
    //在控制台输出内容
    shell.echo('Sorry, this script requires git')
    shell.exit(1)
    return
  }

  if (fs.existsSync(TEMP_DEST)) {
    rmDir(TEMP_DEST)
    console.log(symbols.success, chalk.green('clean 旧的临时文件夹 successfully!'))
  }

  // 创建
  mkDir(TEMP_DEST)
  const result = shell.exec("cd " + TEMP_DEST + "&& " + "git clone " + repoUrl)
  if (result.code !== 0) {
    console.log(symbols.error, chalk.green('git clone 仓库失败！', repoUrl))
    shell.exit(1)
  }
  console.log(symbols.success, chalk.green('git clone 仓库成功！', repoUrl))
}

// 安装依赖
function installModules({ repoDest, installCommand } = {}) {

  installCommand = installCommand || 'yarn install'
  if (installCommand.includes('yarn') && !shell.which('yarn')) {
    //在控制台输出内容
    shell.echo('Sorry, this script requires yarn to install dependencies')
    shell.exit(1)
    return
  }

  let spinner = ora('Installing...')
  spinner.start()
  // 命令行操作安装依赖

  const result = shell.exec(`cd ${repoDest} && ${installCommand}`)
  if (result.code !== 0) {
    console.log(symbols.error, chalk.green('安装依赖失败！'))
    shell.exit(1)
  }
  spinner.succeed()
  console.log(symbols.success, chalk.green('The package.json has installed dependence successfully!'))
}

// 生成HTML
function createHtml({ repoDest, buildCommand } = {}) {
  let spinner = ora('Crate HTML...')
  spinner.start()
  shell.exec(`cd ${repoDest} && ${buildCommand}`) // npm run docs:build
  spinner.succeed()
  console.log(symbols.success, chalk.green('The docs HTML has created successfully!'))
}

// 清除旧目录
function cleanOldDir(targetDir) {
  const target = path.resolve(cwd, targetDir)
  if (fs.existsSync(target)) {
    rmDir(target)
    console.log(symbols.success, chalk.green('clean old dir successfully!'))
  }
}

// 拷贝目标文件夹
function copyTargetDir(repoDest, targetDir, docsDir) {
  const from = path.resolve(repoDest, docsDir) // 'docs-dist'
  const to = path.resolve(cwd, targetDir)
  copyDir(from, to)
}

function afterBuild({ repoDest, targetDir, docsDir }) {
  cleanOldDir(targetDir)
  copyTargetDir(repoDest, targetDir, docsDir)
  console.log(symbols.success, chalk.green('docs has built successfully!'))
}

/* ------ 构建 ------*/
const buildDocs = ({ repoName, buildCommand, installCommand, targetDir, docsDir }) => {
  const repoDest = path.resolve(cwd, TEMP_DIR, repoName)
  installModules({ repoDest, installCommand })
  createHtml({ repoDest, buildCommand })
  afterBuild({ repoDest, targetDir, docsDir })
}

/* --------- 成功后处理 -------- */
const afterSuccess = (callback) => {
  cleanOldDir(TEMP_DIR)
  typeof callback === 'function' && callback()
}

module.exports.downloadRepo = downloadRepo
module.exports.buildDocs = buildDocs
module.exports.afterSuccess = afterSuccess