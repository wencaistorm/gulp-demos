## demo05: html 模块化 ([source](https://github.com/wencaistorm/gulp-demos/tree/master/demo05-gulp-replace))
一个网站下每个页面的 header 和 footer 基本是相同的，每个页面中都会出现一部分相同的代码，那就不免要使用复制粘贴大法，如果这类公同的功能遇到需求变化，则需要重新复制粘贴一遍。

现在可以利用 gulp 实现自动化，模块化。

利用fs模块来读取目标目录下的 html 文件，然后遍历各个文件，把文件中的占位符 `<!--header--><!--headerend-->` 和`<!--footer--><!--footerend-->` 分别替换为 _header.html 和 _footer.html 中的内容，最后再输出到原目录下。

```js
gulp.task('include', function () {
  var htmlDir = './app/';
  fs.readdir(htmlDir, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      files.forEach(function (f) {
        if (f !== '_header.html' && f !== '_footer.html') {
          gulp
            .src(htmlDir + f)
            .pipe(replace(/<!--header-->([\s\S]*)<!--headerend-->/, '<!--header-->\n' + fs.readFileSync(htmlDir + '_partial/_header.html', 'utf-8') + '\n<!--headerend-->'))
            .pipe(replace(/<!--footer-->[\s\S]*<!--footerend-->/, '<!--footer-->\n' + fs.readFileSync(htmlDir + '_partial/_footer.html', 'utf-8') + '\n<!--footerend-->'))
            .pipe(gulp.dest(htmlDir))
        }
      });
    }
  });
});
```

命令行中执行：
```bash
cd demo05-gulp-replace\
cnpm install
gulp include
```

配合上个 demo 中的 browser-sync 插件，效果更好。

```bash
gulp
```

其实不局限于 header 和 footer，只要是可以相同的功能都可以抽取出一个可以共用的 html 模块

参考文章：[利用gulp解决前后端分离的header/footer引入问题](http://www.cnblogs.com/lvdabao/p/5322639.html)
