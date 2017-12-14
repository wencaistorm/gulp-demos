## demo01: 编译 sass ([source](https://github.com/wencaistorm/gulp-demos/tree/master/demo01-sass))

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