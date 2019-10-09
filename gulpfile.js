

'use strict'; 

global.$ = {
	gulp: require('gulp'),  
	del:  require('del'), 
	babel:  require('gulp-babel'), 
	cleanCSS: require('gulp-clean-css'),
	gulpif: require('gulp-if'),
	sassGlob: require('gulp-sass-glob'),
	tabify: require('gulp-tabify'),
	envDev: false,
	gp: require('gulp-load-plugins' )(),
	browserSync: require('browser-sync').create(), 
	path: {
		tasks: require('./gulp/config/tasks.js'),
	},
	public: 'public',
	sourse: 'sourse',
}
$.path.tasks.forEach(function (taskPath){
		require(taskPath)();
	});
 
 
$.gulp.task('img', $.gulp.series('cleanimg','img-responsive'));
		 
$.gulp.task('default', $.gulp.series(
	// $.gulp.parallel('svg','pug','scripts:lib','scripts','file'),
	// $.gulp.parallel('file'),
	$.gulp.parallel(
		'svg','pug','img','scripts', 
		'scripts:common'),
	$.gulp.parallel('sass','watch','serv')
	));
