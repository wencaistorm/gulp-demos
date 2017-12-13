var gulp = require('gulp')
var connect = require('gulp-connect')

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