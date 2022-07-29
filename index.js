// Import Modules
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path")
const http = require('http');

var whoisurl = require('./routes/whoIsUrl');
const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/whoisurl', whoisurl);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});