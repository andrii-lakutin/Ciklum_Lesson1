"use strict";

var gulp     	 = require('gulp'),
    connect  	 = require('gulp-connect')

//Livereload
gulp.task('connect', function() {
  connect.server({
    root: __dirname,                
    port: 8080,
    livereload: true
  });
});

// CSS
gulp.task('css', function () {
  return gulp.src(['build/**/*.css'])
    .pipe(connect.reload());
});

// HTML
gulp.task('html', function () {
  return gulp.src( __dirname + '/index.html')
    .pipe(connect.reload());
});

// Watch for changes in CSS and HTML
gulp.task('watch', function(){
	gulp.watch(['build/**/*.css'], ['css']);
	gulp.watch( __dirname + '/index.html', ['html']);
})

// default
gulp.task('default', ['html','css','watch','connect']);