const fs = require('hexo-fs')

hexo.extend.generator.register('manifest', () => {
  const theme = hexo.theme.config
  const config = hexo.config
  if (!theme.manifest) return null
  const data = {
    name: config.title,
    short_name: config.title,
    icons: theme.icons,
    theme_color: theme.theme_color,
    display: theme.display,
    start_url: config.root,
  }
  return {
    path: 'manifest.json',
    data: JSON.stringify(data),
  }
})
