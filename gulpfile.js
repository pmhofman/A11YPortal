const browserSync = require("browser-sync");
const del = require("del");
const gulp = require("gulp");
const sass = require("gulp-sass");

const browserSyncInstance = browserSync.create();

gulp.task("clean", () => del(["dist/**", "!dist"], { force: true }));

gulp.task("styles", () =>
  gulp
    .src("src/styles/**/*.scss", { base: "src" })
    .pipe(sass().on("error", sass.logError))
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

gulp.task("build", gulp.parallel("html", "images", "js", "styles"));

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
