
"use strict"

var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

// var thor = new Movie({
// 	title: 'Thor',
// 	rating: 'PG-13',
// 	releaseYear: '2011',
// 	hasCreditCookie: true
// });

module.exports = function(server){

	server.post('/movies', function(req, res){
		var movie = new Movie();
		console.log("req--------------",req);
		if(req.body.title){
			movie.title = req.body.title;
		}else{
			// error
		}

		if(req.body.rating){
			movie.rating = req.body.rating;
		}else{
			// no rating
		}

		if(req.body.releaseYear){
			movie.releaseYear = req.body.releaseYear;
		}else{
			// no releaseYear
		}

		if(req.body.hasCreditCookie){
			if(req.body.hasCreditCookie == "true"){
				movie.hasCreditCookie = true;
			}else{
				movie.hasCreditCookie = false;
			}
		}else{
			movie.hasCreditCookie = false;
		}

		movie.save(function(err, movie) {
			if(err){
				console.error(err);
			}
			console.log(movie);
			res.send(movie);
		});
	});

	server.get('/movies', function(req, res){
		Movie.find(function(err, movies){
			if(err){
				console.error(err);
			}
			console.log(movies);
			res.send(movies);
		});
	});

	server.get('/movies/:movieId', function(req, res){
		var movieId = mongoose.Types.ObjectId(req.params.movieId);
		console.log("movieId", movieId, "req.params.movieId", req.params.movieId);
		Movie.findOne({_id: movieId}, function(err, movie){
			if(err){
				console.error(err);
			}
			console.log(movie);
			res.send(movie);
		});
	});

	server.put('/movies/:movieId', function(req, res){
		var movieId = mongoose.Types.ObjectId(req.params.movieId);
		var movie = {};
		if(req.body.title){
			movie.title = req.body.title;
		}else{
			// error
		}

		if(req.body.rating){
			movie.rating = req.body.rating;
		}else{
			// no rating
		}

		if(req.body.releaseYear){
			movie.releaseYear = req.body.releaseYear;
		}else{
			// no releaseYear
		}

		if(req.body.hasCreditCookie){
			if(req.body.hasCreditCookie == "true"){
				movie.hasCreditCookie = true;
			}else{
				movie.hasCreditCookie = false;
			}
		}else{
			movie.hasCreditCookie = false;
		}
		console.log("movieId", movieId, "req.params.movieId", req.params.movieId);
		var conditions = { _id: movieId };
		var update = { $set: movie};
  		var options = { multi: true };

		Movie.update(conditions, update, options, function(err){
			if(err){
				console.error(err);
			}
			res.send("movies updated successfully");
		});
	});

	server.delete('/movies/:movieId', function(req, res){
		var movieId = mongoose.Types.ObjectId(req.params.movieId);
		console.log("movieId", movieId, "req.params.movieId", req.params.movieId);
		Movie.findOneAndRemove({_id: movieId}, function(err, movie){
			if(err){
				console.error(err);
			}
			console.log("movie deleted successfully", movie);
			res.send(movie);
		});
	});
}
