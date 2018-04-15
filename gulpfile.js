'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

/*
Vars
*/
var postcssPlugins = [
  autoprefixer({browsers: ['last 1 version']}),
  cssnano()
];

/*
Sass
*/
gulp.task('sass', function () {
	return gulp.src('sass/**/*.sass')
	 	.pipe(sourcemaps.init())
    .pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/assets/css'))
		.pipe(browserSync.stream());
});

/*
Pug
*/
gulp.task('pug-clean', function () {
  return gulp.src('public/views', { read: false })
    .pipe(clean());
});

gulp.task('pug', ['pug-clean'], function() {
	var YOUR_LOCALS = {};
	gulp.src(['pug/*.pug', '!pug/_*.pug', '!pug/@*.pug'])
    .pipe(plumber())
	  .pipe(pug({
	    locals: YOUR_LOCALS,
	    pretty: false
	  }))
	  .pipe(gulp.dest('public'))
		.pipe(browserSync.stream());

	gulp.src(['pug/views/**/*.pug', '!pug/views/@view.pug'])
    .pipe(plumber())
	  .pipe(pug({
	    locals: YOUR_LOCALS,
	    pretty: false
	  }))
	  .pipe(gulp.dest('public/views'))
		.pipe(browserSync.stream());
});

gulp.task('pug-dev', ['pug-clean'], function() {
	var YOUR_LOCALS = {};
	gulp.src(['pug/*.pug', '!pug/_*.pug', '!pug/@*.pug'])
    .pipe(plumber())
	  .pipe(pug({
	    locals: YOUR_LOCALS,
	    pretty: true
	  }))
	  .pipe(gulp.dest('public'))
		.pipe(browserSync.stream());

	gulp.src(['pug/views/**/*.pug', '!pug/views/@view.pug'])
    .pipe(plumber())
	  .pipe(pug({
	    locals: YOUR_LOCALS,
	    pretty: true
	  }))
	  .pipe(gulp.dest('public/views'))
		.pipe(browserSync.stream());
});


/*
Copy
*/
gulp.task('copy-clean', function () {
  return gulp.src('public/app', { read: false })
    .pipe(clean());
});

gulp.task('copy', ['copy-clean'], function(){
	gulp.src('app/**/*')
	.pipe(ngAnnotate({
    // true ayuda a añadir @ngInject donde no es usado. Infiere.
    // No funciona con resolve, así que tenemos que ser explícitos en ese caso
    add: true
  })) // Makes angular safe to minify.
	.pipe(gulp.dest('public/app'))
});

/*
Minify
*/
gulp.task('minify', function() {
  return gulp.src('*app/**/*.js')
    .pipe(concat('app-project.js'), {newLine: ';'})
    .pipe(gulp.dest('public/app'))
    .pipe(rename('app-project.min.js'))
    .pipe(ngAnnotate({
        // true ayuda a añadir @ngInject donde no es usado. Infiere.
        // No funciona con resolve, así que tenemos que ser explícitos en ese caso
        add: true
    })) // Makes angular safe to minify.
    .pipe(uglify())
    .pipe(gulp.dest('public/app'))
    //.pipe(browserSync.stream());
});

/*
Task Running
*/
gulp.task('default', ['serve']);
gulp.task('build', ['sass', 'pug', 'minify', 'copy']);
gulp.task('serve', ['sass', 'pug-dev', 'copy'], function(){

  browserSync.init({
    server: {
    	baseDir: "public"
    }
  });

  gulp.watch('sass/**/*.sass', ['sass']);
	gulp.watch('pug/**/*.pug', ['pug']);
  gulp.watch('app/**/*.js', function(){gulp.start('copy', browserSync.reload)});

});
