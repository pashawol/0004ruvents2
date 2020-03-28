module.exports = function () {
    $.gulp.task('svg', () => {
        return $.gulp.src('./' + $.sourse + '/svg/*.svg')
            .pipe($.gp.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe($.gp.cheerio({
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                    $('[opacity]').removeAttr('opacity');
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
                    symbol: {
                        sprite: "../sprite.svg",
                        render: {
                            scss: {
                                dest: '../_sprite.scss',
                                template: './' + $.sourse + '/sass/templates/_sprite_template.scss'
                            }
                        }
                    }
                }

            }))

            .pipe($.gulp.dest($.public + '/img/svg'));
    });
};
