import gulp from "gulp";
import less from "gulp-less";
import postcss from "gulp-postcss"; // postcss
import autoprefixer from "autoprefixer"; // postcss 下 添加前缀
import cssnano from "cssnano"; // postcss的压缩 css 插件
import minimist from "minimist"; // node 命令行接受参数
import gutil from "gulp-util"; // 打印
import rename from "gulp-rename"; // 重命名
import plumber from "gulp-plumber";
import Path from "./path/path.js";

const { rootName, root } = Path,
  fs = require("fs"), // node 操作文件夹
  $ = {
    log: txt => {
      gutil.log(gutil.colors.green(txt));
    },
    warn: txt => {
      gutil.log(gutil.colors.yellow(txt));
    },
    error: txt => {
      gutil.log(gutil.colors.red(txt));
    }
  };

// function
function css() {
  return gulp
    .src(Path.style.src)
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest(Path.style.dist))
    .pipe(
      postcss([
        autoprefixer({ browsers: ["last 2 versions"] }),
        cssnano({
          zindex: false,
          minifyFontValues: false
        })
      ])
    )
    .pipe(
      rename(path => {
        path.extname = ".min.css";
      })
    )
    .pipe(gulp.dest(Path.style.dist));
}

// 监听自动编译
function watch() {
  gulp.watch(Path.style.src, css);
}

// 初始化整合
function init() {
  // init() 返回任务包含要执行的任务函数
  return gulp.series(css, gulp.parallel(watch));
}

// go执行
function go() {
  return new Promise((resolve, reject) => {
    resolve(rootName);
  }).then(res => {
    if (res !== undefined) { // 有输入 -n 参数
      fs.exists(root, function(exists) {
        // 判断目录是否存在
        if (exists) {
          const tips = `
            Running.. rootName: ${rootName}, root: ${root}
          `;
          $.log(tips);
          init()();
        } else {
          const tips = `
            Running.. rootName: 「${rootName}」, root: 「${root}」
            Can not find the path, please make sure the path is correct
          `;
          $.error(tips);
        }
      });
    } else {
      const tips = `
                Option 'n' can not be null
            `;
      $.error(tips);
    }
  });
}

// 注册task default
gulp.task("default", go);
