## demo02: 监听文件修改并自动编译 sass ([source](https://github.com/wencaistorm/gulp-demos/tree/master/demo02-sass-watch))

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