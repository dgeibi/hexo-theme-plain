# hexo-theme-plain

## 简介

Plain 是一个 [Hexo](https://hexo.io) 主题，基于 Pug 与 Scss 开发。

## 预览

[在线预览](https://blog.dgeibi.xyz)

## 安装

    $ cd your-hexo-site
    $ git clone https://github.com/dgeibi/hexo-theme-plain.git themes/plain
    $ npm install hexo-render-pug hexo-renderer-sass --save

## 配置

1. 更改**站点** `_config.yml` 中的 `theme` 字段设置为 `plain`
2. 更改**主题** `_config.yml` 中的设置
    1. 调整主题右上角快捷链接的内容
    2. 修改 twitter、github、email 相关信息
    3. 修改 disqus 为站点的 short_name，仅日志支持评论，在日志的首部添加 `comments: false` 以禁用评论
4. 更改`source`目录下的图标
5. 配置/文章的修改可能需要 `source/sw.js` 中的 `ASSETS_CACHE`/`PAGES_CACHE` 以对应的更新在支持 Service Workers 重新缓存

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

The MIT License

Copyright (c) 2017 dgeibi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
