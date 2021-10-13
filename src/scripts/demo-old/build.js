
const { downloadRepo } = require('./dowload_rmel')
const { buildDocs, removeTemp } = require('./build_rmel')
downloadRepo({
  onSuccess: function () {
    buildDocs()
    removeTemp()
  }
})