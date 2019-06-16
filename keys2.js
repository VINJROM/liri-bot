// Spotify npm call
var spotify = require('spotify');
var request = require('request');



// Spotify retrieval
var getSpotify = function(songName) {
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data.tracks.items[0]);
    });
}

// OMDB retrieval
var getMovie = function(movieName) {
    // OMDB request
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    });
}