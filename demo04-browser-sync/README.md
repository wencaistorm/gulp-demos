## demo04: 省时的浏览器同步测试工具 ([source](https://github.com/wencaistorm/gulp-demos/tree/master/demo04-browser-sync))

#### 一图胜千言：

1. 实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面：

![](http://www.browsersync.cn/img/sync-demo.gif)

2. 在一个浏览器中滚动页面、点击等行为也会同步到其他浏览器和设备中
![](http://www.browsersync.cn/img/scroll-demo.gif)

#### 使用

```js
// gulpfile.js
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// 静态服务器
gulp.task('server', function () {
  browserSync.init({
    port: 8080,  // 默认端口 3000
    server: {
      baseDir: "app",  // 静态服务器根目录
    }
  });
});
```
命令行执行如下命令，browser-sync 会自动启动默认浏览器，并打开服务器指向的网址
```bash
cd demo04-browser-sync\
cnpm install
gulp server
```

不仅仅静态服务器：
```js
// 静态服务器 + 监听 scss/html 文件
gulp.task('server', function () {
  browserSync.init({
    port: 8080, // 默认端口 3000
    server: {
      baseDir: "app", // 静态服务器根目录
    }
  });

  gulp.watch("app/scss/*.scss", ['sass']);
  gulp
    .watch("app/*.html")
    .on('change', reload);
});

// scss编译后的 css将注入到浏览器里实现更新
gulp.task('sass', function () {
  return gulp
    .src("app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(reload({stream: true}));
});

gulp.task('default', ['server']);
```

命令行运行  `gulp` 命令，然后修改并保存 html 或者 scss 文件，可以看到浏览器会及时的刷新。

另外在 http://localhost:3001 可以看到静态服务器和 browser-sync 的一些信息。