'use strict'

var fs = require('fs');
var path = require('path');
var _ = require('underscore-plus');

var dirsFile = __dirname + '/../preferences/dirs.txt';
var acceptedExt = ['.avi', '.mp4', '.mpg', '.ogg', '.mkv'];
var unauthaurizedFilename = ['iMovie', 'iPhoto', 'Photos', 'sample'];
var unauthaurizedExt = ['.theater', '.imovielibrary', '.DS_Store'];

var walk = function(dir, done) {
    var results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;
        if (!pending) return done(null, results);

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                // directory
                if (stat && stat.isDirectory()) {
                    // no need to walk unnecessary files
                    if (checkFile(file) != file) {
                        if (!--pending) {
                            done(null, results);
                        }
                        return;
                    }

                    walk(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) {
                            done(null, results);
                        }
                    });
                    // file
                } else if (stat && stat.isFile()) {
                    if (checkFile(file, true) == file) {
                        results.push(file);
                    }
                    if (!--pending) {
                        done(null, results);
                    }
                }
            });
        });
    });
}

var checkFile = function(file, fileCheck) {
    // extension
    var filename = path.basename(file);
    var ext = path.extname(file);
    var filenameNoExt = path.basename(file, ext);

    // conditions
    if (_.contains(unauthaurizedExt, ext)) {
        return;
    }
    // check that the filename does not contain unauthorized text
    // TODO: do this with regexp
    if (_.intersection(filenameNoExt, unauthaurizedFilename).length != 0) {
        return;
    }

    if (filename.lastIndexOf('.', 0) === 0) return;

    if (fileCheck) {
        if (!_.contains(acceptedExt, ext)) return;
    }
    return file
}

util.getFilms = function(done) {
    var dirs = Settings.filesLocations || [];

    dirs.forEach(function(dir) {
        // skip dirs starting with "#"
        if (dir.lastIndexOf('#', 0) === 0) return;

        walk(dir, function(err, results) {
            if (err) throw err;
            done(results);
        });
    });

}
