module.exports = function () {

	const sourse2 = $.sourse + '/img';
	const path = $.public + '/img';
	let src = sourse2 + "/*.{png,jpg,jpeg,webp,raw}";
	let src2 = sourse2 + "/*.{png,jpg}";

	// Clean @*x IMG's
	$.gulp.task('cleanimg', function () {
		return $.del([path + '/@*'], { force: true })
	});
	$.gulp.task('img-responsive', async function () {
		return $.gulp.src(src)
			// .pipe($.gp.newer(path + '/@1x'))
			.pipe($.responsive({
				'*': [{
					// Produce @2x images
					quality: 75, progressive: true, rename: { prefix: '@2x/', },
				},
				{
					webp: { quality: 75 }, progressive: true, rename: { prefix: '@2x/webp/', extname: '.webp' },
				}]
			}))
			.on('error', function () { console.log('No matching images found') })
			.pipe($.gp.rename(function (path) { path.extname = path.extname.replace('jpeg', 'jpg') }))
			.pipe($.gp.vinylFlow())
			.pipe($.gulp.dest(path))
	});

	$.gulp.task('img1x', function () {
		return $.gulp.src(src)
			// .pipe($.resizer({ width: "50%" }))
			.pipe($.gp.newer(path + '/@1x'))
			.pipe($.responsive({
				'*': [
					{
						resize: { width: 400 }, quality: 75, progressive: true, rename: { prefix: '@1x/' }
					},
					{
						resize: { width: 400 }, webp: { quality: 75 }, progressive: true, rename: { prefix: '@1x/webp/', extname: '.webp', },
					},

				]
			}))
			// .on('error', function () { console.log('No matching images found') })
			.pipe($.gp.rename(function (path) { path.extname = path.extname.replace('jpeg', 'jpg') }))
			.pipe($.gp.vinylFlow())
			.pipe($.gulp.dest(path))
	});





	//  $.gulp.task('avif', ()=>{
	//     return $.gulp.src(path + '/@2x/webp/*.webp')
	//         .pipe($.gulpAvif())
	//         .pipe($.gulp.dest(path + '/@2x/avif/'));
	// });
}