// Import Modules
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});