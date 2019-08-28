module.exports = function() {
    $.gulp.task('svg', () => {
        return $.gulp.src('./sourse/svg/*.svg')
            .pipe($.gp.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe($.gp.cheerio({
                run: function($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe($.gp.replace('&gt;', '>'))
            .pipe($.gp.svgSprite({
            		shape: {
						        dimension: {         // Set maximum dimensions
						            maxWidth: 500,
						            maxHeight: 500
						        },
						        spacing: {         // Add padding
						            padding: 0
						        }
						    },
                mode: {
                  symbol			: {
                      sprite: "../sprite.svg",
                      render: {
										 	scss: {
										 		dest:'../_sprite.scss',
										 		template: './sourse/sass/templates/_sprite_template.scss'
										 	}
									  }
                  } 
                }
           
            }))
           
            .pipe($.gulp.dest('./public/img/svg'));
    });
};


//module.exports = function (){
//	$.gulp.task('svg', function () {
//	return $.gulp.src('./sourse/svg/*.svg')
//	// minify svg
//		.pipe($.gp.svgmin({
//			js2svg: {
//				pretty: true
//			}
//		}))
//		// remove all fill, style and stroke declarations in out shapes
//		.pipe($.gp.cheerio({
//			run: function ($) {
//				$('[fill]').removeAttr('fill');
//				$('[stroke]').removeAttr('stroke');
//				$('[style]').removeAttr('style');
//			},
//			parserOptions: {xmlMode: true}
//		}))
//		// cheerio plugin create unnecessary string '&gt;', so replace it.
//		.pipe($.gp.replace('&gt;', '>'))
//		// build svg sprite
//		.pipe($.gp.svgSprite({
//			mode: {
//				symbol: {
//					sprite: "sprite.svg"
//					// render: {
//					// 	scss: {
//					// 		dest:'../../../sass/_sprite.scss',
//					// 		template: assetsDir + "sass/templates/_sprite_template.scss"
//					// 	}
//					// }
//				}
//			}
//		}))
//		.pipe(gulp.dest('./public/img/svg/'));
//});
//  
//}//