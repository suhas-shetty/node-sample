"use strict"

/**
 * Module dependencies
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Movie Schema
 */
var MovieSchema = new Schema({
	title: {
		type: String
	},
	rating: {
		type: String
	},
	releaseYear: {
		type: String
	},
	hasCreditCookie: {
		type: Boolean
	}
})

mongoose.model('Movie', MovieSchema);