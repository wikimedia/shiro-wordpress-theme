/**
 * This gulpfile is responsible for building the legacy Shiro spritesheet.
 *
 * It generates a compiled asset which is committed to the repository, rather
 * than being rebuilt on every deploy. The spritesheet is then copied into the
 * distributed assets folder as part of the main build.
 */
import { deleteAsync } from 'del';
import gulp from 'gulp';
import rev from 'gulp-rev';
import svgsprite from 'gulp-svg-sprite';

gulp.task( 'clean', async ( done ) => {
	await deleteAsync( [
		'spritesheet',
	] );
	done();
} );

gulp.task( 'svg', () => gulp
	.src( 'individual/*.svg' )
	.pipe( svgsprite( {
		mode: {
			symbol: {
				sprite: 'icons.svg',
				dest: '.',
			},
		},
	} ) )
	.pipe( rev() )
	.pipe( gulp.dest( 'spritesheet' ) )
	.pipe( rev.manifest( { merge: true } ) )
	.pipe( gulp.dest( 'spritesheet' ) )
);

gulp.task( 'default', gulp.series( 'clean', 'svg' ) );
