// included packages
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var coffee = require('gulp-coffee');

var paths = {
    scripts: 'app/streamUIApp/*.coffee',
    styles: 'app/streamUIApp/*.styl'
}

gulp.task('stylus', function(){
    return gulp.src('app/**/*.styl')
    .pipe(gulp.dest('app/streamUIApp'))
});

gulp.task('coffee', function(){
    return gulp.src('app/**/*.coffee')
    .pipe(gulp.dest('app/streamUIApp/'))
});

gulp.task('watch', function(){
    gulp.watch(paths.scripts, ['coffee']);
    gulp.watch(paths.styles, ['stylus'])
});