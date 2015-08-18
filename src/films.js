'use strict'

var fs = require('fs');
var path = require('path');
var _ = require('underscore-plus');
var Q = require('q');

var dirsFile = __dirname + '/../preferences/dirs.txt';
var acceptedExt = ['.avi', '.mp4', '.mpg', '.ogg', '.mkv'];
var unauthaurizedFilename = ['iMovie', 'iPhoto', 'Photos', 'sample'];
var unauthaurizedExt = ['.theater', '.imovielibrary', '.DS_Store'];

var walk = function(dir, done) {
    var results = [];
    var deferred = Q.defer();

    fs.readdir(dir, function(err, list) {
        //if (err) return done(err);
        if (err) deferred.reject(err);

        var pending = list.length;
        //if (!pending) return done(null, results);
        if (!pending) deferred.resolve(results)

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                // directory
                if (stat && stat.isDirectory()) {
                    // no need to walk unnecessary files
                    if (checkFile(file) != file) {
                        if (!--pending) {
                            //done(null, results);
                            deferred.resolve(results);
                        }
                        return;
                    }

                    walk(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) {
                            //done(null, results);
                            deferred.resolve(results)
                        }
                    });
                    // file
                } else if (stat && stat.isFile()) {
                    if (checkFile(file, true) == file) {
                        results.push(file);
                    }
                    if (!--pending) {
                        //done(null, results);
                        deferred.resolve(results)
                    }
                }
            });
        });

    });
    return deferred.promise.nodeify(done);
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
    console.log('getting films');

    var dirs = Settings.filesLocations || [];
    //dirs.push(null); // so we can check it is last
    var r = []; // results
    var deferred = Q.defer();

    dirs.forEach(function(dir, i) {

        // skip dirs starting with "#"
        // NOTE: not used anymore
        if (dir.lastIndexOf('#', 0) === 0) return;

        /*walk(dir, function(err, results) {
            if (err) throw err;
            done(results);
        });*/

        walk(dir)
            .then(function(results) {
                // deferred.resolve(results);
                r = r.concat(results);
                if (i+1 == dirs.length) {
                    deferred.resolve(r);
                }
            })
            .catch(function(err) {
                console.error(err);
            });
    });
    return deferred.promise.nodeify(done);
}
