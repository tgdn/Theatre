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

        // set size
        var size = util.getFileSize(file) || 0;

        // set this initially
        this.set({
            'path': file,
            'size': size,
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

    extractData: function() {
        var _this = this;

        imdb.find(this.get('path'))
        .then(function(data) {

            _this.set({
                'imdb_id': data.imdbID,
                'title': data.Title,
                'year': data.Year,
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

                'imdb': true,
                'imdb_finished': true
            });

            return Database.addMovie(_.clone(_this.attributes));

        }, function(err) {
            console.error(err);
        })
        .then(function(result) {
            console.debug(result);
        }, function(err) {
            console.error(err);
        });
    },

    populate: function() {
        var _this = this;

        console.log('getting data');

        // try to get video
        Database.getMovieFromPath(this.get('path'))
        .then(function(result) {
            if (result != null) {
                _this.set(result); // update model, end promise
            } else {
                _this.extractData();
            }
        }, function(err) {
            // nothing was found
            _this.extractData();
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
