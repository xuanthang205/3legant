// const gulp = require("gulp");
// const fileInclude = require("gulp-file-include");
const sass = require('gulp-sass')(require('sass'));
// const rename = require("gulp-rename");

// // Task: Biên dịch SCSS → css/main.css
function styles() {
  return gulp.src('scss/3legant.scss').pipe(sass().on('error', sass.logError)).pipe(rename('main.css')).pipe(gulp.dest('css'));
}
// // Task: Biên dịch các file trong pages/ → pages/*.build.html
// function htmlPages() {
//   return gulp.src(["pages/*.html", "!pages/*.build.html"])
//     .pipe(fileInclude({
//       prefix: "@@",
//       basepath: "includes/",
//       context: { path: "../css/main.css" }
//     }))
//     .pipe(rename((file) => {
//       file.basename += ".build";
//     }))
//     .pipe(gulp.dest("pages"));
// }

// // Watch task
// function watchFiles() {
//   gulp.watch("scss/**/*.scss", styles);
//   gulp.watch(["index.html", "includes/**/*.html"], htmlRoot);
//   gulp.watch(["pages/*.html", "includes/**/*.html", "!pages/*.build.html"], htmlPages);
// }

// // Default
// exports.default = gulp.series(
//   gulp.parallel(styles, htmlRoot, htmlPages),
//   watchFiles
// );

const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const rename = require('gulp-rename');

// Compile HTML (có @@include) → dist/index.html
function html() {
  return gulp
    .src('pages/*.html') // file gốc chứa @@include
    .pipe(fileInclude({ prefix: '@@', basepath: 'includes/' }))
    .pipe(gulp.dest('dist')); // đẩy ra thư mục build
}

// Watch file
function watchFiles() {
  gulp.watch(['*.html', 'includes/*.html'], html);
}

// Gulp default
exports.default = gulp.series(html, styles, watchFiles);
