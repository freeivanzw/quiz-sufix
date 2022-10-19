const gulp         = require('gulp'); 
const sass         = require('gulp-sass')(require('sass')); 
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload; 
const cssnano      = require('gulp-cssnano'); 
const rename       = require('gulp-rename'); 
const del          = require('del'); 
const webp       = require('gulp-webp');

 
gulp.task('sass', function() { 
	return gulp.src(['src/css/sass/main.scss','src/css/sass/adaptive.scss']) 
		.pipe(sass()) 
		.pipe(gulp.dest('dist/css')) 
});

gulp.task('sass-dev', function() { 
	return gulp.src(['src/css/sass/main.scss','src/css/sass/adaptive.scss']) 
		.pipe(sass()) 
		.pipe(gulp.dest('src/css')) 
});
 
gulp.task('scripts', function() {
	return gulp.src([
		'src/js/jquery.min.js',
		'src/js/index.js',
		])
		.pipe(gulp.dest('dist/js'));
});
gulp.task('plugins', function() {
	return gulp.src([
		'src/js/plugins/**/*.js',
		])
		.pipe(gulp.dest('dist/js/plugins'));
});
 
gulp.task('clean', async function() {
	return del.sync('dist');
});

gulp.task('webp', async function() {
	gulp.src(['src/images/*.jpg', 'src/images/*.png',])
	.pipe(webp())
	.pipe(gulp.dest('src/images'));
})

gulp.task('favicon', async function() {
	gulp.src(['src/favicon/*.*',])
	.pipe(gulp.dest('dist/favicon'));
})
 
gulp.task('img', function() {
	return gulp.src('src/images/**/*.*')
		.pipe(gulp.dest('dist/images'));
});
 
gulp.task('prebuild', async function() {
 
	var buildFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
 
	var buildHtml = gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));
 
});

gulp.task('serve', function () {

    browserSync.init({
        server: {
            baseDir: "src"
        },
		notify: false
    });


    gulp.watch("*.html").on("change", reload);
	gulp.watch('src/css/sass/**/*.scss', gulp.parallel('sass-dev')).on("change", reload);
	gulp.watch('src/*.html').on("change", reload) ;
	gulp.watch('src/js/**/*.js').on("change", reload);
});

gulp.task('build', gulp.series('prebuild', 'clean',  'sass', 'scripts', 'plugins', 'img', 'favicon'));

