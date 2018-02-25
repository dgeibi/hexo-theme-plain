/* global hexo */
const fs = require('fs')
const path = require('path')

function readJSON(pathname) {
  try {
    return JSON.parse(fs.readFileSync(pathname, 'utf8'))
  } catch (e) {
    console.log(e)
    return null
  }
}

const assets = readJSON(
  path.join(__dirname, '../source/assets/manifest.json')
) || {
  'main.css': '/assets/main.css',
  'main.css.map': '/assets/main.css.map',
  'main.js': '/assets/main.js',
  'main.js.map': '/assets/main.js.map'
}

hexo.locals.set('themeAssets', () => assets)
