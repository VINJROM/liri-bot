require("dotenv").config('./*.env');
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var spotify = new spotify(keys.spotify);

// used to retrieve artist names in our Spotify call
var getArtistNames = function(artist) {
    return artist.name;
}

// Spotify data retrieval
var getMeSpotify = function(songName) {

    spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i + 1);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('----------------------------------------');
        }
    });
}

// getMeSpotify();

// // OMDB retrieval
// var getMovie = function(movieName) {
//     // OMDB request
//     request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function(error, response, body) {
//         console.log('error:', error);
//         console.log('statusCode:', response && response.statusCode);
//         console.log('body:', body);
//     });
// }

var pick = function(caseData, functionData) {
    switch (caseData) {
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        default:
            console.log("liri doesn't know that");
    }
};

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

// // takes in all of the command line arguments
// var inputString = process.argv;
// // captures the operator and gives command
// var command = inputString[2];
// // input being used for data-retrieval
// var userInput = inputString[3];

// if (command === "concert-this") {
//     console.log();
// } else if (command === "spotify-this-song") {
//     console.log();
// } else if (command === "movie-this") {
//     console.log();
// } else if (command === "do-what-it-says") {
//     console.log();
// }