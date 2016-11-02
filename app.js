
"use strict"

/**
 * Module dependencies
 */
var express = require('express');
var server = express();

var fs = require('fs');
var path = require('path');

console.log("path:", __dirname);

var rootPath = path.normalize(__dirname);

var modelsPath = rootPath + '/Models';
var routesPath = rootPath + '/Routes';

var modelsPathFiles = fs.readdirSync(modelsPath);
var routesPathFiles = fs.readdirSync(routesPath);

var bodyParser = require('body-parser');

server.use(bodyParser.json());

for(var i=0, len=modelsPathFiles.length; i<len; i++){
	require(modelsPath + '/' + modelsPathFiles[i]);
	console.log(modelsPath + '/' + modelsPathFiles[i]);
};

for(var i=0, len=routesPathFiles.length; i<len; i++){
	require(routesPath + '/' + routesPathFiles[i])(server);
	console.log(routesPath + '/' + routesPathFiles[i]);
};

var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/node_exp');

db.on('error', console.error);
db.once('open', function() {
	console.log("database has been opened");
});

server.get('/ping', function(req, res) {
	res.send("who's there?");
});

server.listen(8080, function(){
	console.log("Server is running on port 8080");
});