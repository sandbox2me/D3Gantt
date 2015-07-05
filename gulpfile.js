var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
 
var tsProject = ts.createProject({
    declarationFiles: true,
    noExternalResolve: true,
    out : 'd3gantt.js'
});
 
gulp.task('ts', function() {
    var tsResult = gulp.src('src/**/*.ts')
                    .pipe(ts(tsProject));
 
    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts.pipe(gulp.dest('dist/headers')),
        tsResult.js.pipe(gulp.dest('dist/js'))
    ]);
});
gulp.task('watch', ['ts'], function() {
    gulp.watch('src/**/*.ts', ['ts']);
});


gulp.task('default', [] ,function () {
    gulp.start('ts');
});