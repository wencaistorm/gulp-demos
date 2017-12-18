## 环境安装
0 npm & cnpm 

  因为网络原因，可以安装 cnpm 替代 npm，cnpm 使用方法和 npm 相同：
  ```bash
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```
1. gulp 需要全局安装
    ```bash
    npm install -g gulp
    ```
2. 然后再在项目的开发目录中安装为本地模块
    ```bash
    npm install --save gulp
    ```

3. 安装不同的gulp插件模块，用来对代码做不同的处理，例如：
```bash
npm install --save gulp-uglify
```

## Foreword: What is Gulp
> 用自动化构建工具增强你的工作流程！

+ gulpfile.js

  项目根目录中的 gulpfile.js，是 Gulp 的配置文件。

+ gulp.src()

  src 方法返回一个数据流，参数表示所要处理的文件，这些指定的文件会转换成数据流。
  参数有以下几种形式：
    - `'app/index.html'`: 匹配具体文件，app 目录下的 index.html
    - `'scss/*.scss'`: 匹配 scss 目录下所有以 scss 为后缀的文件
    - `'scripts/**/*.js'`: 匹配 scripts 目录下所有子目录下的 js 文件：
    - `'!scss/base.scss'`: 排除 scss 目录下的 base.scss 文件
    - `['scss/*.scss', 'scripts/*.js']`: 同时匹配 scss 目录下所有的 scss 文件和 scripts 目录下所有的 js 文件
    
  参数也可以是一个数组，用来指定多个文件：
  ```js
  gulp.src(['js/**/*.js', '!js/**/*.min.js'])
  ```

+ gulp.dest()
  >This returns a writable stream
  >
  >File objects piped to this are saved to the file system

  dest 方法将管道的输出写入文件，同时将这些输出继续输出，所以可以依次调用多次dest方法，将输出写入多个目录。如果有目录不存在，将会被新建。
  ```js
  gulp.src('./css/*.css')
  .pipe(concat('apps.css'))
  .pipe(gulp.dest('./css'))
  .pipe(csso())
  .pipe(gulp.dest('../build/css/'));
  ```

+ gulp.task() 创建一个任务

  参数：
    - 第一个参数：任务名称（必填），字符串类型
    - 任务依赖（可选），如果指定了依赖，会先执行依赖的任务，然后再执行本任务。如压缩 js 代码压缩前需要对 js 代码进行校验，则先执行校验任务，后执行压缩任务。
    - 第二个参数：任务所进行的操作（必填）
    
    ```js
    gulp.task('hello',  function () {
      console.log('hello gulp');
    })
    ```
    
    task() 也可以指定一组任务
    
    ```js
    gulp.task('build', [ 'html', 'js', 'css' ]);
    ```
    但是要注意的是，这一组任务是并发的，即同时开始执行，所以无法保证这几个任务执行完毕的先后顺序。
    
    如果想要按照顺序执行，可以把前一个任务写成此任务的依赖任务：
    ```js
    gulp.task('minify_css', [ 'prefix-css' ], function () {
      // minify css
    })
    ```
    此时，`minify_css` 任务依赖 `prefix-css` 任务，`minify_css` 会在 `prefix-css` 之后执行。
    

+ gulp.watch

  watch方法用于指定需要监视的文件。一旦这些文件发生变动，就运行指定任务。
  
  ```js
  gulp.task('default', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
  });
  ```
  上面代码指定，一旦 scss 目录下任意子目录中的 scss 文件发生变化，就执行 sass 任务



+ default task

  如果一个任务的名字为 `default`，就表明它是“默认任务”，在命令行直接输入 `gulp` 命令，就会运行该任务。
  ```js
  gulp.task('default', ['a', 'b', 'c']);
  ```

  执行的时候，直接使用 `gulp`，就会运行 `a`、`b`、`c` 三个任务。

**如果上面的一些概念过于抽象，可以暂时把它们忘掉，通过下面简单例子的学习，也许你会更容易上手**
