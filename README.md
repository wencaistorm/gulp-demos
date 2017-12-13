## Foreword: What is Gulp
> 用自动化构建工具增强你的工作流程！

+ gulp.src()
  >This returns a readable stream.

  >Takes a file system glob (like grunt) and starts emitting files that match.

  >This is piped to other streams

  接受一个参数用于指定要处理的源文件的匹配符路径，匹配符路径可以是字符串，也可以是数组，例如：
  
    - `'app/index.html'`: 匹配具体文件，app 目录下的 index.html
    - `'scss/*.scss'`: 匹配 scss 目录下所有以 scss 为后缀的文件
    - `'scripts/**/*.js'`: 匹配 scripts 目录下所有子目录下的 js 文件：
    - `'!scss/base.scss'`: 排除 scss 目录下的 base.scss 文件
    - `['scss/*.scss', 'scripts/*.js']`: 同时匹配 scss 目录下所有的 scss 文件和 scripts 目录下所有的 js 文件

+ gulp.dest()
  >This returns a writable stream

  >File objects piped to this are saved to the file system

  接受一个参数用于指定处理完后文件输出的路径，例如：`./public'`

+ gulp.task() 创建一个任务
  >It registers the function with a name.

  >You can optionally specify some dependencies if other tasks need to run first.

  接受 3 个参数，分别是：
    - 任务名称（必填），字符串类型
    - 任务依赖（可选），如果指定了依赖，会先执行依赖的任务，然后再执行本任务。如压缩 js 代码压缩前需要对 js 代码进行校验，则先执行校验任务，后执行压缩任务。
    - 任务所进行的操作（必填）
    
+ gulp.run
  >Runs all tasks with maximum concurrency

  并行运行多个task

+ gulp.watch
  >Runs a function when a file that matches the glob changes
  >Included in core for simplicity
 
+ npm & cnpm 

  因为网络原因，可以安装 cnpm 替代 npm，cnpm 使用方法和 npm 相同：
  ```bash
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```

+ gulpfile.js

  可以简单理解为 gulp 的配置文件，在这个文件中定义想要做的事情

+ default task

  一般通过 `gulp + 任务名称` 的方式去调用某个任务，但是有一个任务例外：default 任务
  ```js
  gulp.task('default', ['a', 'b', 'c']);
  ```

  此任务可直接执行 `gulp` 命令来完成

**如果上面的一些概念过于抽象，可以暂时把它们忘掉，通过下面简单例子的学习，也许你会更容易上手**

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

命令行执行：
```bash
cd demo01-sass\
cnpm install
gulp
```

观察 css 目录，已经编译出了 2 个 css 文件。

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
cd demo02-sass-watch\
cnpm install
gulp
```

然后修改 style.scss 文件，比如给 h1 增加一行样式：
```css
color: lightgreen;
```

观察命令行打印日志和 css 目录下的 style.css 文件内容，可以看到在修改 style.scss 文件之后，sass 编译任务自动执行。

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




## Useful links:

这里仅仅给出了最常用最简单的功能，如需了解更多，以下内容可供参考：

+ gulp: https://www.gulpjs.com.cn/

+ gulp-sass: https://www.npmjs.com/package/gulp-sass

+ gulp-connect: https://www.npmjs.com/package/gulp-connect

## 未完待续……
