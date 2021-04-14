

'use strict';

global.$ = {
	gulp: require('gulp'),
	del: require('del'),
	babel: require('gulp-babel'),
	cleanCSS: require('gulp-clean-css'),
	gulpif: require('gulp-if'),
	sassGlob: require('gulp-sass-glob'),
	tabify: require('gulp-tabify'),
	envDev: false,
	gcmq: require('gulp-group-css-media-queries'),
	gp: require('gulp-load-plugins')(),
	browserSync: require('browser-sync').create(),
	postcss: require('gulp-postcss'),
	cssnano: require('cssnano'),
	nested: require('postcss-nested'),
	pcmq: require('postcss-combine-media-query'),
	responsive: require('@tigersway/gulp-responsive'),
	resizer: require('gulp-images-resizer'),
	path: {
		tasks: require('./gulp/config/tasks.js'),
	},
	public: 'public',
	sourse: 'sourse',
}
$.path.tasks.forEach(function (taskPath) {
	require(taskPath)();
});



$.gulp.task('img', $.gulp.series('cleanimg', 'img-responsive', 'img1x'));
$.gulp.task('libs', $.gulp.series('cleanlibs', 'copylibs'));

$.gulp.task('default', $.gulp.series('svg', 
	// $.gulp.parallel('svg','pug','scripts:lib','scripts','file'),
	// $.gulp.parallel('file'),

	'img',
	$.gulp.parallel(
		'pug',
		'pug',
		'img',
		'libs',
		'scripts',
		// 'scripts:common',
		// 'scripts:app',
	),
	$.gulp.parallel('sass', 'watch', 'serv')
));
