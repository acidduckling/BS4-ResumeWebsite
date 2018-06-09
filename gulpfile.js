var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('compile-sass', function() {
  return gulp
    .src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('move-js', function() {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/tether/dist/js/tether.min.js',
      'node_modules/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest('src/js/'))
    .pipe(browserSync.stream());
});

gulp.task('move-fonts', function() {
  return gulp
    .src(['node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest('src/fonts'))
    .pipe(browserSync.stream());
});

gulp.task('move-css', function() {
  return gulp
    .src(['node_modules/font-awesome/css/font-awesome.min.css'])
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

// Run sass when server runs
// Run server
// Watch for any changes in src/scss folder and reload the browser
// Watch for HTML changes
gulp.task('launch-server', ['compile-sass'], function() {
  browserSync.init({
    server: './src/',
    open: false
  });
  gulp.watch(
    [
      'node_modules/bootstrap/scss/bootstrap.scss',
      'node_modules/font-awesome/scss/font-awesome.scss',
      'src/scss/*.scss'
    ],
    ['compile-sass']
  );
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Run gulp
// Launch server and browser
// execute JS task
gulp.task('default', ['move-js', 'move-fonts', 'move-css', 'launch-server']);
