// Assigning modules to local variables
var gulp        = require('gulp');
var sass        = require('gulp-sass');

var cleanCSS    = require('gulp-clean-css');
var rename      = require("gulp-rename");
var concat      = require("gulp-concat");
var sourcemaps  = require('gulp-sourcemaps');

var pkg         = require('./package.json');


// Default task
gulp.task('default', ['sass', 'combine-css']);//, 'minify-css']);

// Sass task to compile the sass files and add the banner
gulp.task('sass', function() {
  return gulp.src('public/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('all.scss.css'))
    .pipe(gulp.dest('./public/build'))
});

gulp.task('combine-css', function(){
  return gulp.src([ 'public/stylesheets/**/*.css',
                    'build/all.scss.css'])
      .pipe(concat('all.css'))
      .pipe(gulp.dest('./public/build'))
});

gulp.task('minify-css', function() {
  return gulp.src('build/all.css')
      .pipe(sourcemaps.init())
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/build'))
});

// root/build/all.min.css

gulp.task('watch', function () {
  gulp.watch('public/stylesheets/**/*.scss', ['sass', 'combine-css']);//, 'minify-css']);
  // gulp.watch(['public/stylesheets/**/*.css',
  //                   'build/all.scss.css'], ['combine-css']);
  // gulp.watch('./css/**/*.css', ['minify-css']);
});