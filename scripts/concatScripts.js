var fs = require('hexo-fs');
var path = require('path');

hexo.extend.generator.register('concatScripts', function concatScripts() {
  return {
    path: 'js/main.js',
    data: function concat() {
      var source = path.join('themes', hexo.config.theme, 'source', 'js');
      var core = fs.readFileSync(path.join(source, '_core.js'));
      var Util = fs.readFileSync(path.join(source, '_Util.js'));
      return Util.concat([core]);
    }
  };
});
