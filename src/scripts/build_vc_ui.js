const { downloadRepo } = require('./util')

// 由于仓库私密性，暂时搁置
const REPO_URL = 'git@github.com:HarryChen0506/vc-ui.git'
const REPO_NAME = 'vc-ui'
const token = 123

downloadRepo({
  repoUrl: REPO_URL,
  repoName: REPO_NAME,
  options: {
    clone: true,
    headers: { 'X-Authentication': `Bearer ${token}` }
  },
  onSuccess: function () {
    console.log(123)
  }
})