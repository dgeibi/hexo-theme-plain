var gulp = require("gulp");
var concat = require('gulp-concat');
var replace = require('gulp-replace');

gulp.task("default", ['js', 'sw']);

gulp.task("sw", function () {
  return gulp.src('source/sw.js')
    .pipe(replace(/#\d*/, '#' + Math.ceil(Math.random() * 1000000)))
    .pipe(gulp.dest('source'));
})

gulp.task("js", function () {
  return gulp.src(['./source/js/_Util.js', './source/js/_core.js'])
    .pipe(concat("main.js"))
    .pipe(gulp.dest("source/js"));
})