# hexo-theme-plain

## 简介

Plain 是一个 [Hexo](https://hexo.io) 主题，基于 Pug 与 Scss 开发。

## 预览

[在线预览](https://blog.dgeibi.xyz)

## 安装

    $ cd your-hexo-site
    $ git clone https://github.com/dgeibi/hexo-theme-plain.git themes/plain
    $ npm install hexo-render-pug --save

## 配置

1. 更改**站点** `_config.yml` 中的 `theme` 字段设置为 `plain`
2. 更改**站点** `_config.yml` 中的 `language` 字段设置为 `zh-cmn-Hans` 或者 `en`
3. 更改**主题** `_config.yml` 中的设置
    1. 调整主题右上角快捷链接的内容
    2. 修改 `twitter`、`github`、`email` 相关信息
    3. 修改 `disqus` 为站点的 `short_name`，以使用 Disqus，在日志的首部添加 `comments: false` 以禁用评论
    4. 修改 `gentie_productKey` 的值，以使用网易云跟帖，在日志的首部添加 `comments: false` 以禁用评论
4. 更改`source`目录下的图标

## 更新

    $ cd themes/plain
    $ git pull

## 致谢

* [jekyll/minima](https://github.com/jekyll/minima)
* [blackgear/mono_hexo](https://github.com/blackgear/mono_hexo)
* LEA VEROU
* CSS 魔法
* ……

## LICENSE

[MIT](LICENSE)
