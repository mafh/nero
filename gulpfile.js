var gulp 	 = require('gulp'),
	sass 	 = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger  = require('gulp-rigger'),
	browserSync  = require('browser-sync'),
	wait  = require('gulp-wait'),
	del = require('del'),
	postcss      = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	listing = require('gulp-listing');

gulp.task('clear', function() {
	// Удаляем папку build перед сборкой
	del.sync('build');

});

gulp.task('sass', function(){

	gulp.src('src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		// .pipe(wait(300))
		.pipe(sass({indentType: 'tab', indentWidth: '1', outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('src/temp'));
		// .pipe(browserSync.reload({stream:true}));
});

gulp.task('autoprefixer', function () {
	gulp.src('src/temp/**/*.css')
		.pipe(postcss( [ autoprefixer() ] ))
		.pipe(gulp.dest('build/css'))
		.pipe(wait(500))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'build',
			index: 'sitemap.html'
		},
		notify: false
	});
});

gulp.task('sitemap', function() {
	gulp.src('src/*.html')
		.pipe(listing('sitemap.html'))
		.pipe(gulp.dest('build/'));
});

gulp.task('html', function() {
	gulp.src('src/**/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('build/'))
		.pipe(wait(300))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function() {
	gulp.src('src/js/**/*')
		.pipe(gulp.dest('build/js'));
});

gulp.task('copy', ['clear', 'sass', 'autoprefixer', 'html', 'js', 'browser-sync', 'sitemap'], function(){

	var buildFonts = gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('build/fonts'));

	var buildImages = gulp.src('src/i/**/*')
		.pipe(gulp.dest('build/i'));

	var buildUserimg = gulp.src('src/userimg/**/*')
		.pipe(gulp.dest('build/userimg'));

	var copyHtml = gulp.src('src/*.html')
		.pipe(gulp.dest('build'));

	var copyJs = gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('build/js'));

	var copyVideo = gulp.src('src/video/**/*.*')
		.pipe(gulp.dest('build/video'));

	var copyCSV = gulp.src('src/*.csv')
		.pipe(gulp.dest('build'));

	var buildHtml = gulp.src('src/**/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('build/'));

	var buildPDF = gulp.src('src/pdf/**')
		.pipe(gulp.dest('build/pdf'));
});

gulp.task('default', ['sass', 'autoprefixer', 'html', 'js', 'browser-sync', 'sitemap'], function(){

	var buildFonts = gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('build/fonts'));

	var buildImages = gulp.src('src/i/**/*')
		.pipe(gulp.dest('build/i'));

	var buildUserimg = gulp.src('src/userimg/**/*')
		.pipe(gulp.dest('build/userimg'));

	var copyHtml = gulp.src('src/*.html')
		.pipe(gulp.dest('build'));

	var copyJs = gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('build/js'));

	var copyCSV = gulp.src('src/*.csv')
		.pipe(gulp.dest('build'));

	var buildHtml = gulp.src('src/**/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('build/'));

	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/temp/**/*.css', ['autoprefixer']);
	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/js/**/*.js', ['js']).on('change', browserSync.reload);
});