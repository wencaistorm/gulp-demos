## demo03: 开启本地服务器并监听文件修改自动刷新 ([source](https://github.com/wencaistorm/gulp-demos/tree/master/demo03-gulp-connect))

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
cd demo03-gulp-connect\
cnpm install
gulp connect
```

浏览器打开 http://localhost:8080 或者 http://127.0.0.1:8080 ，浏览器默认打开目录下的 index.html ，如果不存在 index.html 则显示目录结构。

当然如果只有一个本地服务器，意义并不是很大。我们的目的是监听文件变化并自动刷新浏览器。

可以将 gulpfile.js 修改如下：
```js
gulp.task('server', function() {
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

gulp.task('default', ['server', 'watch:html', 'watch:css']);
```

此处稍微复杂一点：
1. `connect.server()` 接收一个对象作为参数
    + 默认端口号为 `8080`，被其他程序占用时可指定其他端口
    + 当入口文件 index.html 不是位于根目录时，用于指定 index.html 的路径
    + 开启自动刷新
2. 自动刷新是通过 `websocket` 实现的，文件发生变化时，通过 `websocket` 通知浏览器刷新，但是如果只是 css 文件变化了，最理想的状态是只更新 css 文件即可，`css-reload` 和 `html-reload` 就是在做这样的事情。
3. 指定监听的文件，当监听的文件发生变化时，执行 `connect.reload()`
4. 组合任务，多个任务并行