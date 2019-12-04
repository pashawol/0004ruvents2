module.exports = function (){

	
	$.gulp.task('cleanlibs', function() {
		return $.del([$.public + '/libs'], { force: true })
	});
	$.gulp.task('copylibs', function () {
		return  	$.gulp.src($.gp.npmDist({ 
				// copyUnminified: true, 
				excludes: [
				'*.map',
				'src/**/*',
				'./@babel/*',
				'animate.css/source/',
				'inputmask/inputmask/',
				'source',
				'./babel*/*',
				'./gulp*',
				'examples',
				'example',
				'node_modules',
				'core',
				'demo/**/*',
				'spec/**/*',
				'docs/**/*',
				'tests/**/*',
				'test/**/*',
				'Gruntfile.js',
				'gulpfile.js',
				'package.json',
				'package-lock.json',
				'bower.json',
				'composer.json',
				'yarn.lock',
				'webpack.config.js',
				'README',
				'LICENSE',
				'CHANGELOG',
				'*.yml',
				'*.md',
				'*.coffee',
				'*.ts',
				'*.scss',
				'*.sass',
				'*.less'] 
		}), { base: './node_modules' })
		.pipe($.gp.rename(function(path) {
			path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
	}))
				.pipe($.gulp.dest($.public + '/libs'));
	});
}