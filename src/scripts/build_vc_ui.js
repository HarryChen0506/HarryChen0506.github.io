const path = require('path')
const { downloadRepo, buildDocs, afterSuccess } = require('./service')

const REPO_NAME = 'vc-ui'
const REPO_URL = 'git@github.com:HarryChen0506/vc-ui.git'
const DOCS_DIR = 'docs-dist' // 项目文档打包后生成的文件夹名
const TARGET_DIR = 'vc-ui' // 最终的目的文件夹
const BUILD_COMMAND = 'npm run docs:build'

const init = () => {
  downloadRepo({
    repoUrl: REPO_URL
  })
  buildDocs({
    repoName: REPO_NAME,
    buildCommand: BUILD_COMMAND,
    targetDir: TARGET_DIR,
    docsDir: DOCS_DIR
  })
  afterSuccess(() => {
    console.log('全部流程结束！')
  })
}

init()