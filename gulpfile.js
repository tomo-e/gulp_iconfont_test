var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

gulp.task('iconfont', function(){
  gulp.src(['icon/*.svg'])
    .pipe(iconfont({
      fontName: 'icon',
      fixedWidth: true,
      startCodepoint: 0xF001
    }))
    .on('codepoints', function(codepoints, options) {
      codepoints = codepoints.map(function(glyph) {
        return {
          name: glyph.name,
          codepoint: glyph.codepoint.toString(16) // convert decimal to hex.
        };
      });

    // CSS templating, e.g.
      gulp.src('template/icon.css')
        .pipe(consolidate('mustache', {
          glyphs: codepoints,
          fontName: 'icon',
          fontPath: '../fonts/',
          timeStamp: Date.now()
      }))
      .pipe(gulp.dest('files/css/'))
  })

  .pipe(gulp.dest('files/fonts/'));
});

gulp.task('default', ['iconfont']);