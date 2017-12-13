var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('server', ['sass'], function () {
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