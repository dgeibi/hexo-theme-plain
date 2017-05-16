hexo.extend.generator.register('manifest', function manifest() {
  var data;
  var theme = hexo.theme.config;
  var config = hexo.config;
  if (!theme.manifest) return null;
  data = {
    name: config.title,
    short_name: config.title,
    icons: theme.icons,
    theme_color: theme.theme_color,
    display: theme.display,
    start_url: config.root
  };
  return {
    path: 'manifest.json',
    data: JSON.stringify(data)
  };
});
