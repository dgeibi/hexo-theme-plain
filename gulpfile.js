var gulp = require("gulp");
var concat = require('gulp-concat');
var replace = require('gulp-replace');

gulp.task("default", function () {
  gulp.src(['./source/js/_Util.js', './source/js/_core.js'])
    .pipe(concat("main.js"))
    .pipe(gulp.dest("source/js"));
  return gulp.src('source/plain.appcache')
    .pipe(replace(/#.*/,'#'+Math.ceil(Math.random()*1000000)))
    .pipe(gulp.dest('source'));
});
