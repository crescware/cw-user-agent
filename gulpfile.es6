'use strict';
/* eslint-disable */
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import shell from 'gulp-shell';

const path = {
  src:  `./src`,
  lib:  `./lib`,
  test: `./test`,
  bin:  `./node_modules/.bin`
};

const bin = {
  babel: `${path.bin}/babel`
};

gulp.task('babel', shell.task([`${bin.babel} ${path.src} --out-dir ${path.lib}`]));
gulp.task('mocha', () => {
  return gulp
    .src(`${path.test}/**/*-test.js`)
    .pipe(mocha({reporter: 'dot'}))
    .on('error', function() { this.emit('end'); });
});
gulp.task('watch', ['babel', 'mocha'], () => {
  gulp
    .watch([`${path.src}/**/*.js`], ['babel'])
    .on('error', err => process.exit(1));

  gulp
    .watch([`${path.src}/**/*.js`, `${path.test}/**/*-test.js`], ['mocha'])
    .on('error', err => process.exit(1));
});
