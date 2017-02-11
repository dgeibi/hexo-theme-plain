var gulp = require("gulp");
var concat = require('gulp-concat');

gulp.task("default", ['js']);

gulp.task("js", function () {
  return gulp.src(['./source/js/_Util.js', './source/js/_core.js'])
    .pipe(concat("main.js"))
    .pipe(gulp.dest("source/js"));
})
