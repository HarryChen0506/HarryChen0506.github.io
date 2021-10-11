const { downloadRepo } = require('./util')

// 由于仓库私密性，暂时搁置
const REPO_URL = 'git@github.com:HarryChen0506/vc-ui.git'
const REPO_NAME = 'vc-ui'

downloadRepo({
  repoUrl: REPO_URL,
  repoName: REPO_NAME,
  onSuccess: function () {
    console.log(123)
  }
})