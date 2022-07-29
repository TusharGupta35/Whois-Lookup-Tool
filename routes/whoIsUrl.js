var express = require("express");
const cors = require('./cors');
const bodyParser = require('body-parser');

const isValidDomain = require("is-valid-domain")
const whoisjson = require("whois-json");

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
            var results = await whoisjson(domain);

            var data = {
                "url": "https://www." + results.domainName,
                "domain": results.domainName,
                "updated_date": results.updatedDate,
                "creation_date": results.creationDate,
                "expiration_date": results.registrarRegistrationExpirationDate,
                "registrar": results.registrar,
                "reg_country": results.registrantCountry
            }

            console.log(data);
            res.write("{" + '\n')
            res.write("     url: " + data.url + '\n')
            res.write("     domain: " + data.domain + '\n')
            res.write("     updated_date: " + data.updated_date + '\n')
            res.write("     creation_date: " + data.creation_date + '\n')
            res.write("     expiration_date: " + data.expiration_date + '\n')
            res.write("     registrar: " + data.registrar + '\n')
            res.write("     reg_country: " + data.reg_country + '\n')
            res.write("}")
            // res.send(JSON.stringify(data, null, '\t'));
        }
        else {
            res.send("Enter ulr without https or http")
        }
        res.send();
    })


module.exports = whoisurl;