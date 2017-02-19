var gulp = require('gulp');
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass'),
	livereload = require('gulp-livereload'),
	imagemin = require('gulp-imagemin'),
	prefix = require('gulp-autoprefixer');

function errorLog(error){
	console.error.bind(error);
	this.emit('end');
}

// image task
// compress image

gulp.task('image', function(){
	gulp.src('assets/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('lib/img'));
});

// scripts task
//uglify
gulp.task('scripts', function(){
	gulp.src('assets/js/*.js')
		.pipe(uglify())
		.on('error', errorLog)
		.pipe(gulp.dest('lib/js'));
});

//styles task
gulp.task('sass', function() {
    sass('assets/scss/**/*.scss', { style: 'compressed' })
        .on('error', errorLog)
        
        .pipe(gulp.dest('lib/css'))
        .pipe(prefix('last 2 versions'))
        .pipe(livereload());
});﻿

//watch task
//watch all files
gulp.task('watch', function(){
	var server = livereload.listen();
	gulp.watch('assets/js/*.js', ['scripts']);
	gulp.watch('assets/scss/*.scss', ['sass']);
	gulp.watch('assets/img/*', ['image']);

});

gulp.task('default', ['scripts', 'sass', 'image', 'watch']);