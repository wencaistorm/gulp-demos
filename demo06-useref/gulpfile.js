var gulp = require('gulp');
var useref = require('gulp-useref');

gulp.task('default', function () {
return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('build'));
});