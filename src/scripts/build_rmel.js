// const path = require('path')
const { downloadRepo, buildDocs, afterSuccess } = require('./service')

const REPO_NAME = 'md2html-demo'
const REPO_URL = 'git@github.com:HarryChen0506/md2html-demo.git'
const DOCS_DIR = 'dist' // 项目文档打包后生成的文件夹名
const TARGET_DIR = 'react-markdown-editor-lite' // 最终的目的文件夹
const BUILD_COMMAND = 'npm run prod'
const INSTALL_COMMAND = 'npm install'

const init = () => {
  downloadRepo({
    repoUrl: REPO_URL
  })
  buildDocs({
    repoName: REPO_NAME,
    buildCommand: BUILD_COMMAND,
    installCommand: INSTALL_COMMAND,
    targetDir: TARGET_DIR,
    docsDir: DOCS_DIR
  })
  afterSuccess(() => {
    console.log('全部流程结束！')
  })
}

init()