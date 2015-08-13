'use strict'

var Settings = {};
Settings.filesLocations = [];

// setup default values

var defaultMovieLocation = path.join(process.env.HOME || process.env.USERPROFILE || process.env.HOMEPATH, 'Movies');
Settings.filesLocations.push(defaultMovieLocation);


Database.getSettings()
.then(function(data) {
    _.each(data, function(elt) {
        Settings[elt.key] = elt.value;
    });

    Settings.filesLocations = _.uniq(Settings.filesLocations);

}, function(err) {
    console.error('error getting settings')
});
