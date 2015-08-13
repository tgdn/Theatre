'use strict'

var fs = require('fs');
var path = require('path');
var Datastore = require('nedb');
var Q = require('q');

var usePromises = true;

// TODO: use appData
var dataPath = path.join('.', 'db');

db.settings = new Datastore({
    filename: path.join(dataPath, 'settings.db'),
    autoload: true
});

db.movies = new Datastore({
    filename: path.join(dataPath, 'movies.db'),
    autoload: true
});

// Popcorn Time - Streaming video through torrents
// Copyright © 2014 - 2015  Popcorn Time and the contributors (popcorntime.io)
// Popcorn Time is released under the GPL
// promisifyDatastore and promisifyDb are functions from Popcorn Time

function promisifyDatastore(datastore) {
    if (!usePromises) return;
    datastore.insert = Q.denodeify(datastore.insert, datastore);
    datastore.update = Q.denodeify(datastore.update, datastore);
    datastore.remove = Q.denodeify(datastore.remove, datastore);
}

promisifyDatastore(db.settings);
promisifyDatastore(db.movies);

// This utilizes the exec function on nedb to turn function calls into promises
var promisifyDb = function (obj) {
    if (!usePromises) return obj;

    return Q.Promise(function (resolve, reject) {
        obj.exec(function (error, result) {
            if (error) {
                return reject(error);
            } else {
                return resolve(result);
            }
        });
    });
};

db.settings.ensureIndex({
    fieldName: 'key',
    unique: true
});

db.movies.ensureIndex({
    fieldName: 'imdb_id',
    unique: true
});

db.movies.ensureIndex({
    fieldName: 'path',
    unique: true
});


var Database = {

    // Setting
    getSetting: function(data) {
        return promisifyDb(db.settings.findOne({
            key: data.key
        }));
    },

    getSettings: function() {
        return promisifyDb(db.settings.find({}));
    },

    // format: {key: key_name, value: settings_value}
    writeSetting: function(data) {
        return Database.getSetting({
                key: data.key
            })
            .then(function(result) {
                if (result) {
                    return db.settings.update({
                        'key': data.key
                    }, {
                        $set: {
                            'value': data.value
                        }
                    }, {});
                } else {
                    return db.settings.insert(data);
                }
            });
    },

    // Movie
    addMovie: function(data) {
        return db.movies.insert(data);
    },

    deleteMovie: function(imdb_id) {
        return db.movies.remove({
            imdb_id: imdb_id
        });
    },

    getMovie: function(imdb_id) {
        return promisifyDb(db.movies.findOne({
            imdb_id: imdb_id
        }));
    },

    getMovieFromPath: function(filename) {
        return promisifyDb(db.movies.findOne({
            path: filename
        }));
    }
}
