var gulp     = require('gulp');
var mocha    = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

var specPath = ["specs/**/*.js"];
var srcPath  = ["lib/**/*.js"];

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('mocha', function (cb) {
  gulp.src(srcPath)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(specPath)
        .pipe(mocha())
        .on('error', handleError)
        .pipe(istanbul.writeReports())
        .on('end', cb)
    });
});

gulp.task('watch-mocha', function() {
    gulp.watch(['lib/**', 'specs/**'], ['mocha']);
});
