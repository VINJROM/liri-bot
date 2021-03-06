require("dotenv").config('./*.env');
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var spotify = new spotify(keys.spotify);
var omdb = require('omdb');
var bandsintown = require('bandsintown');

// Spotify data retrieval
var getSpotify = function(songName) {

    if (!songName) {
        songName = "The Sign";
    }
    spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i + 1);
            console.log('artist(s): ' + songs[i].artists[0].name);
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('----------------------------------------');
        }
    });
}


// // OMDB data retrieval
var getMovie = function(movieName) {
    // console.log('movieName', movieName)
    if (!movieName) {
        movieName = "Mr.Nobody";
    }
    axios.get('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy').then(function(response) {
            var movieData = response.data;
            console.log('Title: ' + movieData.Title);
            console.log('Year: ' + movieData.Year);
            console.log('Rated: ' + movieData.Rated);
            console.log('Language: ' + movieData.Language);
            console.log('Plot: ' + movieData.Plot);
            console.log('Actors: ' + movieData.Actors);
            console.log('IMDB Rating: ' + movieData.imdbRating);
            console.log('Rotten Tomatoes Rating: ' + movieData.tomatoRating);
            console.log('Rotten tomatoes URL: ' + movieData.tomatoURL);
            console.log('----------------------------------------');
        })
        .catch(function(error) {
            if (error.response) {
                console.log(error);
            }
        });
}

// BandsInTown data retrieval
var getConcert = function(artistName) {

    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").then(function(response) {
        console.log(response.data);
        var events = response.data
        for (var i = 0; i < events.length; i++) {
            // console.log("Artist: " + events[i].venue.lineup(0));
            console.log("Venue: " + events[i].venue.name);
            console.log("City: " + events[i].venue.city);
            var date = moment(events[i].datetime);
            console.log("Date: " + date.format('L'));
            console.log('\n----------------------------------------\n');
        }
    }).catch(function(error) {
        // handle error
        console.log(error);
    })


};

// captures function input
var pick = function(caseData, functionData) {
    switch (caseData) {
        case 'spotify-this-song':
            getSpotify(functionData);
            break;
        case 'movie-this':
            getMovie(functionData);
            break;
        case 'concert-this':
            getConcert(functionData);
            break;
        default:
            console.log("Not sure what you mean by that");
    }
};

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);