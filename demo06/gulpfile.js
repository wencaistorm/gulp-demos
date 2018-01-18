var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

gulp.task('minify-img', function () {
  return gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('minify-js', function () {
  return gulp
    .src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('minify-html', function () {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify-css', function () {
  return gulp
    .src('src/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['minify-html', 'minify-img', 'minify-js', 'minify-css'])