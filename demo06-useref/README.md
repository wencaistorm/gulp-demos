## 静态资源合并

经常我们会需要引入一些第三方插件，如 bootstrap 、jquery 、underscore 等等，通常情况下都会将这些第三方资源进行合并成为单个文件，以减少网络请求，同时 html 页面书写也不显得混乱。

gulp-useref 会解析在 html 文件中指定的构建块，将构建快中的 js 和 css 资源合并。

例如：

index.html

```html
<!-- build:css /css/all.css -->
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/main.css">
<!-- endbuild -->
```

gulpfile.js

```js
var gulp = require('gulp');
var useref = require('gulp-useref');

gulp.task('useref', function (){
    return gulp.src('index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'))
})
```

执行 useref 任务后，index.html 变成这样：
```html
<link rel="stylesheet" href="css/all.css">
```