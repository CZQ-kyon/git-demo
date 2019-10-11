/**
 * 注册任务
 * 1、LESS编译 压缩 合并
 * 2、JS合并 压缩 混淆
 * 3、img复制
 * 4、html压缩
 * 5、启动服务器并监视
 */
var gulp = require("gulp");
var less = require("gulp-less"); //转换less文件的插件
var cssnano = require("gulp-cssnano"); //压缩css的插件
var concat = require("gulp-concat"); //合并的插件
var uglify = require("gulp-uglify"); //压缩混淆插件
var htmlmin = require("gulp-htmlmin"); //html压缩插件
var browserSync = require('browser-sync');

//1、LESS编译 压缩 合并
gulp.task('style', done => {
    gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream:true
        }));//浏览器刷新
    done();
});

//2、JS合并 压缩 混淆
gulp.task('script', done => {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream:true
        }));//浏览器刷新
    done();
});

//3、img复制
gulp.task('image', done => {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream:true
        }));//浏览器刷新
    done();
});

//4、html压缩
gulp.task('html', done => {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, //去掉空格
            removeComments: true //去掉注释
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream:true
        }));//浏览器刷新
    done();
});

//5、启动服务器并监视
gulp.task('serve', done => {
    browserSync({
        server: {
            baseDir: ['dist']
        },
    }, function (err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch('src/styles/*.less',gulp.series('style'));
    gulp.watch('src/scripts/*.js',gulp.series('script'));
    gulp.watch('src/images/*.*',gulp.series('image'));
    gulp.watch('src/*.html',gulp.series('html'));

});