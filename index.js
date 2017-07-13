var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

// Add headers
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function(req, res, err) {
    console.log('here');
    res.send({hey:'hello world'});
});

app.post('/', function(req, res, err) {
    console.log('Info is', req.body);
    res.json({hello: "world"}).send();
});

app.listen(3000, function () {
	console.log('Example app running on  3000')
});
