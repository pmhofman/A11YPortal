const axe = require('gulp-axe-webdriver');
const browserSync = require('browser-sync');
const del = require('del');
//const eslint = require('gulp-eslint');
const gulp = require('gulp');
const sass = require('gulp-sass');

const browserSyncInstance = browserSync.create();


gulp.task('axe', function() {
  var options = {
    saveOutputIn: 'allHtml.json',
    headless: true,
    urls: ['dist/guidelines/design/visual-design.html', 'dist/index.html']
  };
  return axe(options);
});

gulp.task('clean', () => del(['dist/**', '!dist'], { force: true }));

gulp.task('scss', () =>
  gulp
    .src('src/styles/**/*.scss', { base: 'src' })
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'))
);

gulp.task('css', () =>
  gulp
    .src('src/styles/**/*.css', { base: 'src', since: gulp.lastRun('css') })
    .pipe(gulp.dest('dist'))
);

gulp.task('html', () =>
  gulp
    .src('src/**/*.html', { base: 'src', since: gulp.lastRun('html') })
    .pipe(gulp.dest('dist'))
);

gulp.task('js', () =>
  gulp
    .src('src/**/*', { base: 'src', since: gulp.lastRun('js') })
//    .pipe(eslint())
    .pipe(gulp.dest('dist'))
);

gulp.task('images', () =>
  gulp
    .src('src/images/**/*', { base: 'src', since: gulp.lastRun('images') })
    .pipe(gulp.dest('dist'))
);

gulp.task('fonts', () =>
  gulp
    .src('src/fonts/**/*', { base: 'src', since: gulp.lastRun('fonts') })
    .pipe(gulp.dest('dist'))
);

gulp.task('pdf', () =>
  gulp
    .src('src/**/*.pdf', { base: 'src', since: gulp.lastRun('pdf') })
    .pipe(gulp.dest('dist'))
);

gulp.task('psd', () =>
  gulp
    .src('src/**/*.psd', { base: 'src', since: gulp.lastRun('psd') })
    .pipe(gulp.dest('dist'))
);

gulp.task('zip', () =>
  gulp
    .src('src/**/*.zip', { base: 'src', since: gulp.lastRun('zip') })
    .pipe(gulp.dest('dist'))
);

gulp.task('htaccess', () =>
  gulp
    .src('src/**/.htaccess', { base: 'src', since: gulp.lastRun('htaccess') })
    .pipe(gulp.dest('dist'))
);

gulp.task('build', gulp.parallel('html', 'images', 'js', 'scss', 'css', 'fonts', 'pdf', 'psd', 'zip', 'htaccess'));


gulp.task('valid', function () {
  gulp.src('src/**/*.html')
    .pipe(htmlv())
    .pipe(gulp.dest('./out'));
});

gulp.task('watch', () => {
  browserSyncInstance.init({
    port: 8080,
    server: 'dist'
  });

  gulp
    .watch(['src/**/*'], gulp.series('build'))
    .on('change', browserSyncInstance.reload);
});

gulp.task('start:dev', gulp.series('clean', 'build', 'watch'));

gulp.task('test', gulp.series('clean', 'build', 'axe'));
