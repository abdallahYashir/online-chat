// included packages
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var coffee = require('gulp-coffeescript-concat');

gulp.task('stylus', function(){
    return gulp.src('app/**/*.styl')
    .pipe(gulp.dest('app/streamUIApp'))
});

gulp.task('coffee', function(){
    return gulp.src('app/**/*.coffee')
    .pipe(gulp.dest('app/streamUIApp/'))
});