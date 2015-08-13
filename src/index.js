
(function() {

var ipc = require('ipc');
var remote = require('remote');
var fs = require('fs');
var path = require('path');

var titlebar = require('titlebar')();
var appmenu_template = require('./menus').appmenu_template;

var appRoot = './';
var isFullscreen = false;

window.onload = function() {

    var WindowData = new models.Window
    var Window = new views.Window({ model: WindowData });

    ipc.send('ready');

    // init collections
    // get films
    var filmLib = new collections.FilmLibrary();
    // imdb only
    var movieLib = new collections.FilmLibrary();
    // other videos
    var videoLib = new collections.FilmLibrary();

    // init views
    var moviesGrid = new views.Grid({ el: $('#movies-container > ul'), collection: movieLib });
    var videosGrid = new views.Grid({ el: $('#videos-container > ul'), collection: videoLib });
    var allGrid = new views.Grid({ el: $('#complete-collection-container > ul'), collection: filmLib });

    //
    filmLib.on('add remove change', function(model) {
        if (model.get('imdb')) {
            if (!movieLib.contains(model)) {
                movieLib.add(model, {merge: true});
            }
            if (videoLib.contains(model)) {
                videoLib.remove(model)
            }
        } else {
            if (!videoLib.contains(model)) {
                videoLib.add(model, {merge: true})
            }
        }
    });

    util.getFilms(function(films) {
        films.forEach(function(film) {
            filmLib.add(new models.Film(film));
        });
    });
}


})();
