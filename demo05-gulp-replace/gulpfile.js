var gulp = require('gulp')
var fs = require('fs')
var replace = require('gulp-replace')
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

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

// 静态服务器 + 监听 scss/html 文件
gulp.task('server', ['include'], function () {
  browserSync.init({
    port: 8080, // 默认端口 3000
    server: {
      baseDir: "app", // 静态服务器根目录
    }
  });

  gulp.watch(['app/_partial/*.html'], ['include']);
  gulp
    .watch(['app/*.html', 'app/css/*.css'])
    .on('change', reload);
});

gulp.task('default', ['server'])
