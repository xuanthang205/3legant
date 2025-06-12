const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

// Compile HTML (có @@include) → dist/index.html
function html() {
  return gulp
    .src('pages/*.html') // file gốc chứa @@include
    .pipe(fileInclude({ prefix: '@@', basepath: 'includes/' }))
    .pipe(gulp.dest('dist')); // đẩy ra thư mục build
}

function htmlIncludes() {
  return gulp
    .src(['includes/*.html', '!includes/_*.html']) // optional
    .pipe(fileInclude({ prefix: '@@', basepath: 'includes/' }))
    .pipe(gulp.dest('includes')); // compile lại nếu nested
}

function styles() {
  return gulp.src('scss/3legant.scss').pipe(sass().on('error', sass.logError)).pipe(rename('main.css')).pipe(gulp.dest('css'));
}

// Watch file
// function watchFiles() {
//   gulp.watch(['pages/*.html', 'includes/*.html'], html);
//   gulp.watch('scss/**/*.scss', styles);
// }

function watchFiles() {
  gulp.watch(['pages/*.html', 'includes/*.html'], gulp.series(htmlIncludes, html));
  gulp.watch('scss/**/*.scss', styles);
}


// Gulp default
exports.default = gulp.series(html, styles, watchFiles);
