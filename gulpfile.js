const gulp = require('gulp');
const stripBom = require('gulp-stripbom');
const sass = require('gulp-sass')(require('sass'));

function css() {
  return gulp
  .src('src/assets/css/**/*.scss')
  .pipe(sass({ outputStyle: 'compressed'}))
  .on('error', sass.logError)
  .pipe(stripBom())
  .pipe(gulp.dest('./src/config/layouts/includes/write/'))
}

function watchCSS() {
  gulp.watch('src/assets/css/**/*.scss', gulp.parallel(css))
};

exports.default = gulp.parallel(css, watchCSS);
exports.production = gulp.parallel(css);