# Gulp.js 包教不包会

## What is this

使用 gulp 作为项目构建工具一年左右，期间遇到了很多的问题，查阅了很多文档。现在项目已经接近尾声，2017 也即将结束，值此时机，将 gulp 的使用方法和项目的构建方式通过一个个 demo 展示出来，作为自己在 gulp 方面的一个总结，同时也可供对 gulp 感兴趣的同学参考。

## How to use

环境：node 和 npm（可以使用 cnpm 代替）

首先，全局安装 gulp
```bash
npm install -g gulp
```

然后，clone 代码到本地
```bash
git clone https://github.com/wencaistorm/gulp-demos.git
```

最后在 demo* 目录下安装依赖，查看效果
例如：
```bash
cd demo01-sass
npm install
gulp
```

## demo list
0. demo00: [gulp 基础概念](https://github.com/wencaistorm/gulp-demos/tree/master/demo00)
1. demo01: [编译 sass](https://github.com/wencaistorm/gulp-demos/tree/master/demo01-sass)
1. demo02: [监听文件修改并自动编译 sass](https://github.com/wencaistorm/gulp-demos/tree/master/demo02-sass-watch)
1. demo03: [开启本地服务器并监听文件修改自动刷新](https://github.com/wencaistorm/gulp-demos/tree/master/demo03-gulp-connect)
1. demo04: [省时的浏览器同步测试工具](https://github.com/wencaistorm/gulp-demos/tree/master/demo04-browser-sync)
1. demo05: [html 模块化](https://github.com/wencaistorm/gulp-demos/tree/master/demo05-gulp-replace)

## 未完待续……
## Useful links:

这里仅仅给出了最常用最简单的功能，如需了解更多，可参考文档：

+ gulp: https://www.gulpjs.com.cn/
+ gulp-sass: https://www.npmjs.com/package/gulp-sass
+ gulp-connect: https://www.npmjs.com/package/gulp-connect
+ Browsersync: http://www.browsersync.cn/

## 福利

这个东西是 Chrome 一个插件，叫做 Octotree ，效果是这个样子滴：

![](https://raw.githubusercontent.com/buunguyen/octotree/master/docs/chrome-github.jpg)

有了它，可以很方便的查看 repo 的目录结构，并且可以直接点击跳转，而不用在一个一个文件夹里找来找去了（我大天朝的 github 访问速度感人！）。

安装方式有两种：
1. Chrome 网上应用商店安装
2. 离线安装：地址栏中打开 `chrome://extensions/` ，将 Octotree.crx 文件拖到这个页面中，即可完成安装。Octotree 插件下载地址：[百度网盘下载](https://pan.baidu.com/s/1i5IkhN3)

最后有个小技巧，鼠标放在目录中某个文件上面，文件图标会变成下载图标，点击图标可以直接下载此文件。