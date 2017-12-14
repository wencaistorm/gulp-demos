# Gulp.js 包教不包会

## Foreword: What is Gulp
> 用自动化构建工具增强你的工作流程！

+ gulp.src()
  >This returns a readable stream.
  >
  >Takes a file system glob (like grunt) and starts emitting files that match.
  >
  >This is piped to other streams

  接受一个参数用于指定要处理的源文件的匹配符路径，匹配符路径可以是字符串，也可以是数组，例如：
  
    - `'app/index.html'`: 匹配具体文件，app 目录下的 index.html
    - `'scss/*.scss'`: 匹配 scss 目录下所有以 scss 为后缀的文件
    - `'scripts/**/*.js'`: 匹配 scripts 目录下所有子目录下的 js 文件：
    - `'!scss/base.scss'`: 排除 scss 目录下的 base.scss 文件
    - `['scss/*.scss', 'scripts/*.js']`: 同时匹配 scss 目录下所有的 scss 文件和 scripts 目录下所有的 js 文件

+ gulp.dest()
  >This returns a writable stream
  >
  >File objects piped to this are saved to the file system

  接受一个参数用于指定处理完后文件输出的路径，例如：`./public'`

+ gulp.task() 创建一个任务
  >It registers the function with a name.
  >
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
  >
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

## demo list

1. demo01: [编译 sass](https://github.com/wencaistorm/gulp-demos/tree/master/demo01-sass)
1. demo02: [监听文件修改并自动编译 sass](https://github.com/wencaistorm/gulp-demos/tree/master/demo02-sass-watch)
1. demo03: [开启本地服务器并监听文件修改自动刷新](https://github.com/wencaistorm/gulp-demos/tree/master/demo03-gulp-connect))
1. demo04: [省时的浏览器同步测试工具](https://github.com/wencaistorm/gulp-demos/tree/master/demo04-browser-sync)
1. demo05: [html 模块化](https://github.com/wencaistorm/gulp-demos/tree/master/demo05-gulp-replace)

## Useful links:

这里仅仅给出了最常用最简单的功能，如需了解更多，可参考文档：

+ gulp: https://www.gulpjs.com.cn/
+ gulp-sass: https://www.npmjs.com/package/gulp-sass
+ gulp-connect: https://www.npmjs.com/package/gulp-connect
+ Browsersync: http://www.browsersync.cn/

## 未完待续……
