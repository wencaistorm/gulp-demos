


## Foreword: What is Gulp
> 用自动化构建工具增强你的工作流程！
+ gulp.task

+ gulp.src

+ gulp.dest

+ gulp.run

+ gulp.watch

+ npm cnpm 

+ gulpfile.js

+ default

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
gulp sass
```

## demo01: 编译 sass

使用 gulp-sass 插件将 scss 文件编译成 css 文件

例如：将 scss 目录下的 scss 文件编译并输出到 css 目录中
```js
// gulpfile.js
var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('sass', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css/'))
})
```

index.html
```
<link rel="stylesheet" href="./css/base.css">
<link rel="stylesheet" href="./css/style.css">
```

命令行执行：
```bash
gulp sass
```

观察 css 目录，并使用浏览器打开 index.html

## demo02: 监听文件修改并自动编译 sass

为了避免每次修改 scss 文件后手动执行 gulp 任务，使用 gulp 的监听功能

例如：监听 scss 目录下 scss 文件发生变化自动执行 sass 任务
```js
// gulpfile.js
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});
```

命令行执行：
```bash
gulp sass:watch
```

然后修改 style.scss 文件，给 h1 增加一行样式：
```css
color: lightgreen;
```

观察命令行打印日志和 css 目录下的 style.css 文件内容

## demo03: 开启本地服务器并监听文件修改自动刷新

例如：
```js
// gulpfile.js
var gulp = require('gulp')
var connect = require('gulp-connect')

gulp.task('connect', function() {
  connect.server();
});
```

命令行执行：
```bash
gulp connect
```

浏览器打开 http://localhost:8080 或者 http://127.0.0.1:8080 ，浏览器默认打开目录下的 index.html ，如果不存在 index.html 则显示目录结构。

当然如果只有一个本地服务器，意义并不是很大。我们实现的是监听文件变化并自动刷新浏览器。

例如：
```js
gulp.task('connect', function() {
  connect.server({
    // 指定端口号
    port: 8888,

    // 指定入口
    root: 'app',

    // 开启自动刷新
    livereload: true

  });
});

gulp.task('html-reload', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('css-reload', function () {
  gulp.src('./app/**/*.css')
    .pipe(connect.reload());
});

gulp.task('watch:html', function () {
  gulp.watch(['./app/*.html'], ['html-reload']);
});

gulp.task('watch:css', function () {
  gulp.watch(['./app/**/*.css'], ['css-reload']);
});

gulp.task('default', ['connect', 'watch:html', 'watch:css']);
```
此处稍微复杂一点：
1. `connect.server()` 接收一个对象作为参数
    + 默认端口号为 `8080`，被其他程序占用时可指定其他端口
    + 当入口文件 index.html 不是位于根目录时，用于指定 index.html 的路径
    + 开启自动刷新
2. 自动刷新是通过 `websocket` 实现的，文件发生变化时，通过 `websocket` 通知浏览器刷新，但是如果只是 css 文件变化了，最理想的状态是只更新 css 文件即可，`css-reload` 和 `html-reload` 就是在做这样的事情。
3. 指定监听的文件，当监听的文件发生变化时，执行 `connect.reload()`
4. 组合任务，多个任务并行





## Useful links:

这里仅仅给出了最常用最简单的功能，如需了解更多，以下内容可供参考：

+ gulp: https://www.gulpjs.com.cn/

+ gulp-sass: https://www.npmjs.com/package/gulp-sass

+ gulp-connect: https://www.npmjs.com/package/gulp-connect

## 未完待续……
