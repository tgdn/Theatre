'use strict'

var fs = require('fs');
var path = require('path');
var async = require('async');
var Q = require('q');

models.Film = Backbone.Model.extend({

    initialize: function(file) {
        var _this = this;

        this.on('change:title', function() {
            _this.updateDisplayTitle();
        });

        // set this initially
        this.set({
            'path': file,
            'size': 0,
            'imdb': false,
            'imdb_finished': false, // if all attributes have been populated
            'title': path.basename(file, path.extname(file)),
            'poster': '',
        });

        // populate attributes
        this.populate();

        this.view = new views.FilmRow({
            model: this
        });

        return this;
    },

    getIMDB: function() {
        var _this = this;
        var deferred = Q.defer();

        // should be called only if title and year are set
        imdb.search(this.get('title'), this.get('year'))
        .then(function(data) {
            // imdb found some results
            var imdb_id = data.Search[0].imdbID;
            _this.set({
                'imdb': true,
                'imdb_id': imdb_id
            });

            return imdb.getById(imdb_id);

        }, function(error) {
            deferred.reject(error);
            throw error;
        })
        .then(function(data) {
            // imdb returned data
            _this.set({
                'actors': data.Actors,
                'awards': data.Awards,
                'country': data.Country,
                'director': data.Director,
                'genre': data.Genre,
                'language': data.Language,
                'metascore': data.Metascore,
                'plot': data.Plot,
                'poster': data.Poster,
                'runtime': data.Runtime,
                'type': data.Type,
                'imdb_rating': data.imdbRating,
                'imdb_votes': data.imdbVotes,

                'imdb_finished': true
            });
            deferred.resolve(true);

        }, function(error) {
            deferred.reject(error);
            throw error;
        });

        return deferred.promise;
    },

    populate: function() {
        var _this = this;

        console.log('getting data')

        var extractData = function() {
            //console.debug('extracting data from file - '+  _this.get('path'));
            // set size
            var size = util.getFileSize(_this.get('path'));
            _this.set('size', size);
            console.debug('well size is: ' + size);

            // extract title and year from name
            var extractedName = imdb.parseFilename(_this.get('path'));
            console.log('found: ' + extractedName);

            if (extractedName !== undefined) {
                var title = extractedName.title;
                var year = extractedName.year;

                _this.set('title', title);
                _this.set('year', year);

                // get the data from imdb and add to DB

                imdb.search(this.get('title'), this.get('year'))
                .then(function(data) {
                    // imdb found some results
                    var imdb_id = data.Search[0].imdbID;
                    _this.set({
                        'imdb': true,
                        'imdb_id': imdb_id
                    });

                    return imdb.getById(imdb_id);

                }, function(error) {
                    throw error;
                })
                .then(function(data) {
                    // imdb returned data
                    _this.set({
                        'actors': data.Actors,
                        'awards': data.Awards,
                        'country': data.Country,
                        'director': data.Director,
                        'genre': data.Genre,
                        'language': data.Language,
                        'metascore': data.Metascore,
                        'plot': data.Plot,
                        'poster': data.Poster,
                        'runtime': data.Runtime,
                        'type': data.Type,
                        'imdb_rating': data.imdbRating,
                        'imdb_votes': data.imdbVotes,

                        'imdb_finished': true
                    });

                    return Database.addMovie(_.clone(_this.attributes));

                }, function(error) {
                    throw error;
                })
                .then(function(data) {
                    console.debug('data inserted successfully');
                }, function(error) {
                    console.error(error);
                });

                /*_this.getIMDB()
                .then(function(result) {
                    // at this point result is true
                    // the result is unimportant

                    // now storing in db
                    return Database.addMovie(_.clone(_this.attributes));

                }, function(error) {
                    throw 'Error retrieving IMDB: ' + error;
                });*/
            }
        };

        //console.log(_this.get('title'));

        // try to get video
        Database.getMovieFromPath(this.get('path'))
        .then(function(result) {
            if (result != null) {
                console.debug('got some non null result')
                _this.set(result); // update model, end promise
            } else {
                extractData();
            }
            console.debug('dont really know is happening')
        }, function(err) {
            console.debug('didnt get shit in db')
            // nothing was found
            extractData();
        });

        return this;
    },

    updateDisplayTitle: function() {
        var dispTitle = this.get('title');

        if (this.get('title').length > 21)
            dispTitle = dispTitle.substring(0, 18) + '...';

        this.set('displayTitle', dispTitle);

        return this;
    }
});
