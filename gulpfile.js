const gulp = require("gulp");
const gulpSass = require("gulp-sass");
const removeFiles = require("gulp-remove-files");
const babel = require("gulp-babel");
const connect = require("gulp-connect");

gulp.task("serve", done => {
  connect.server({
    root: "./",
    port: 8001,
    livereload: true
  });
  done();
});

gulp.task("html", done => {
  gulp.src("./*.html").pipe(connect.reload());
  done();
});

gulp.task("scripts", done => {
  gulp
    .src("./js/script.js")
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(gulp.dest("./dist/scripts/"))
    .pipe(connect.reload());
  done();
});

gulp.task("clear", done => {
  gulp.src(["./dist/styles/*", "./dist/scripts/*"]).pipe(removeFiles());
  done();
});

gulp.task("styles", done => {
  gulp
    .src("./styles/main/main.scss")
    .pipe(gulpSass())
    .pipe(gulp.dest("./dist/styles/"))
    .pipe(connect.reload());
  done();
});

gulp.task("watch", () => {
  gulp.watch("./styles/main/main.scss", gulp.series("styles"));
  gulp.watch("./js/script.js", gulp.series("scripts"));
  gulp.watch("./*.html", gulp.series("html"));
});

gulp.task(
  "default",
  gulp.series("clear", "scripts", "styles", "serve", "watch")
);
