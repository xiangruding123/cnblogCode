var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    htmlmin1 = require('gulp-htmlmin'),
    htmlmin = require('gulp-html-minifier'),
    rename = require('gulp-rename'),
    clean = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    jasmine = require('gulp-jasmine'),
    del = require('del'),
    gulpUtil = require('gulp-util');

/********************HTML*************************/
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    gulp.src('html/*.html')
        .pipe(htmlmin1(options))
        .pipe(gulp.dest('dist/html'))
        .pipe(notify({ message: 'testHtmlmin task complete' }));
});

/********************CSS*************************/
gulp.task('styles', function() {  
return gulp.src('css/*.css')
 .pipe(gulp.dest('dist/css'))
 .pipe(minifycss())
 .pipe(gulp.dest('dist/css'))
 .pipe(notify({ message: 'styles task complete' }));
});
/********************javascript*************************/
gulp.task('scripts', function() {  
return gulp.src('js/*.js')
 // .pipe(jshint('.jshintrc'))
 // .pipe(jshint.reporter('default'))
 .pipe(concat('main.js'))
 .pipe(gulp.dest('dist/js'))
 // .pipe(rename({suffix: '.min'}))
 .pipe(uglify())
 .pipe(gulp.dest('dist/js'))
 .pipe(notify({ message: 'Scripts task complete' }));
})
/********************images*************************/
gulp.task('images', function() {  
return gulp.src('img/*')
 .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
 .pipe(gulp.dest('dist/img'))
 .pipe(notify({ message: 'Images task complete' }));
});
/********************clean*************************/
gulp.task('clean', function() {  
return gulp.src(['dist/html', 'dist/css', 'dist/js', 'dist/img'], {read: false})
 .pipe(clean());
});
/**************************HTML****************************/
//watch
gulp.task('watch', function() {
    // 看守所有.html档
    gulp.watch('html/*.html', ['testHtmlmin']);

     // 看守所有.css档
     gulp.watch('css/*.css', ['styles']);
     // 看守所有.js档
     gulp.watch('js/*.js', ['scripts']);
     // 看守所有图片档
     gulp.watch('img/*', ['images']);
});

/**
 * 默认执行
 */
gulp.task('default', ['clean'], function() {  
 gulp.start('testHtmlmin','styles', 'scripts', 'images');
});
