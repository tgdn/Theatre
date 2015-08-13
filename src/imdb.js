'use strict'

var request = require('request');
var path = require('path');
var Q = require('q');

var base_url = 'http://www.omdbapi.com/?';
var response = 'json';
var plot = 'full';

imdb.parseFilename = function(filename) {
    // this is what we should test (remove extname)
    // movie.file.avi => movie.file
    var basename = path.basename(filename, path.extname(filename));

    // replace dots with spaces for easier manipulation
    // movie.file => "movie file"
    basename = basename.replace(/\./g, ' ');

    // the filename might not comply
    try {
        var extracted = basename.match( /(.)*(\s)(\d){4}/g )[0];
        var year = extracted.match( /(\d){4}/g )[0];
        var title = extracted.replace( /(\d){4}/g , '').trim();
    } catch (err) {
        return undefined;
    }
    return {
        'title': title,
        'year': year
    };

}

// private
var makeRequest = function(url, done) {
    console.debug('Retrieving ' + url)
    var deferred = Q.defer();
    request(url, function(error, response, body) {
        if (error || response.statusCode != 200) {
            //throw error || 'Response was ' + response.statusCode;
            deferred.reject(error || statusCode);
        } else {
            deferred.resolve(response, body);
        }
        //done(error, response, body);
    });
    return deferred.promise.nodeify(done);
}

imdb.search = function(text, year, done) {
    var url;
    var deferred = Q.defer();
    if (year) url = base_url.concat('s=', text, '&y=', year, '&r=', response);
    else url = base_url.concat('s=', text, '&r=', response);

    makeRequest(url)
    .then(function(response, body) {
        var parsed = JSON.parse(body);
        deferred.resolve(parsed);
    }, function(error) {
        deferred.reject(error);
    });

    return deferred.promise.nodeify(done);
    /*makeRequest(url, function(err, response, body) {
        var parsed = null;
        var error = null;
        if (!err) parsed = JSON.parse(body);
        if (parsed.Error || err) error = parsed.Error || err;

        done(error, parsed);
    });*/
}

imdb.getById = function(id, done) {
    var url = base_url.concat('i=', id, '&r=', response, '&plot', plot);
    var deferred = Q.defer();

    makeRequest(url)
    .then(function(response, body) {
        var parsed = JSON.parse(body);
        deferred.resolve(parsed);
    }, function(error) {
        deferred.reject(error);
    });

    return deferred.promise.nodeify(done);

    /*makeRequest(url, function(err, response, body) {
        var parsed = null;
        var error = null;
        if (!err) parsed = JSON.parse(body);
        if (parsed.Error || err) error = parsed.Error || err;

        done(error, parsed);
    });*/
}

imdb.getByTitle = function(title, year, done) {
    var url;
    var deferred = Q.defer();
    if (year) url = base_url.concat('t=', title, '&y=', year, '&r=', response, '&plot', plot);
    else url = base_url.concat('t=', title, '&r=', response);

    makeRequest(url)
    .then(function(response, body) {
        var parsed = JSON.parse(body);
        deferred.resolve(parsed);
    }, function(error) {
        deferred.reject(error);
    });

    return deferred.promise.nodeify(done);

    /*makeRequest(url, function(err, response, body) {
        var parsed = null;
        var error = null;
        if (!err) parsed = JSON.parse(body);
        if (parsed.Error || err) error = parsed.Error || err;

        done(error, parsed);
    });*/
}
