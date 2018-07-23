const axe = require("gulp-axe-webdriver");
const browserSync = require("browser-sync");
const del = require("del");
const gulp = require("gulp");
const sass = require("gulp-sass");

const browserSyncInstance = browserSync.create();


gulp.task('axe', function() {
  var options = {
    saveOutputIn: 'allHtml.json',
    headless: true,
    urls: ['dist/guidelines/design/visual-design.html', 'dist/index.html']
  };
  return axe(options);
});

gulp.task("clean", () => del(["dist/**", "!dist"], { force: true }));

gulp.task("scss", () =>
  gulp
    .src("src/styles/**/*.scss", { base: "src" })
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist"))
);

gulp.task("css", () =>
  gulp
    .src("src/styles/**/*.css", { base: "src", since: gulp.lastRun("css") })
    .pipe(gulp.dest("dist"))
);

gulp.task("html", () =>
  gulp
    .src("src/**/*.html", { base: "src", since: gulp.lastRun("html") })
    .pipe(gulp.dest("dist"))
);

gulp.task("js", () =>
  gulp
    .src("src/**/*.js", { base: "src", since: gulp.lastRun("js") })
    .pipe(gulp.dest("dist"))
);

gulp.task("images", () =>
  gulp
    .src("src/images/**/*", { base: "src", since: gulp.lastRun("images") })
    .pipe(gulp.dest("dist"))
);

gulp.task("fonts", () =>
  gulp
    .src("src/fonts/**/*", { base: "src", since: gulp.lastRun("fonts") })
    .pipe(gulp.dest("dist"))
);

// Add pdf, psd, zip, eot, ttf, woff, .htaccess

gulp.task("build", gulp.parallel("html", "images", "js", "scss", "css", "fonts"));

gulp.task("watch", () => {
  browserSyncInstance.init({
    port: 8080,
    server: "dist"
  });

  gulp
    .watch(["src/**/*"], gulp.series("build"))
    .on("change", browserSyncInstance.reload);
});

gulp.task("start:dev", gulp.series("clean", "build", "watch"));

gulp.task("test", gulp.series("clean", "build", "axe"));
