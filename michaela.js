//calling necessary node packages and files
require("dotenv").config('./*.env');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);

//need to figure out how the spotify API JSON response is structured. How do I pull just relevant info from the returned objects?
var songEntry = process.argv[2];

var spotifyThisSong = function(songName) {

    var getArtistsNames = function(artist) {
        return artist.name;
    };

    spotify.search({ type: 'track', query: songEntry }),
        function(err, data) {

            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            var songs = data.tracks.items;
            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log('artist(s): +' + songs[i].artists.map(getArtistsNames));
                console.log('song name: ' + songs[i].name);
                console.log('preview song: ' + songs[i].preview_url);
                console.log('album: ' + songs[i].album.name);
                console.log('-------------------------------------');
            }
        }
};


var pick = function(caseData, functionData) {
    switch (caseData) {
        case 'spotify-this-song':
            spotifyThisSong(functionData);
            break;
        default:
            console.log("liri doesn't know that");
    }

};

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};