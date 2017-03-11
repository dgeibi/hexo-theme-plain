var fs = require("hexo-fs")

hexo.extend.generator.register('readme', function () {
  return {
    path: "js/main.js",
    data: function () {
      const source = 'themes/' + hexo.config.theme + '/source'
      const core = fs.readFileSync(`${source}/js/_core.js`)
      const Util = fs.readFileSync(`${source}/js/_Util.js`)
      return Util.concat([core])
    }
  }
})
