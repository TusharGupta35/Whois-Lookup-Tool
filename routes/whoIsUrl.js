var express = require("express");
const cors = require('./cors');
const bodyParser = require('body-parser');

const isValidDomain = require("is-valid-domain")
const whoisjson = require("whois-json");
const moment = require("moment");
const whois = require('whois')

const whoisurl = express.Router();
whoisurl.use(bodyParser.json());

whoisurl.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        res.send('This is my get req')
    })
    .post(cors.corsWithOptions, async (req, res) => {
        var domain = req.body.domain;

        if (isValidDomain(domain)) {
            var results = await whoisjson('google.com');
            console.log(JSON.stringify(results, null, 2));
            // res.send(results);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(results);
        }

        res.send("This is my post req")
    })


module.exports = whoisurl;