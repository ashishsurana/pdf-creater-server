var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
PDFDocument = require('pdfkit');
const fs = require('fs');
var randomstring = require("randomstring");


var app = express();

// Add headers
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/api/v1/file/:path', function (req, res, err) {
    res.sendFile(__dirname + '/' + req.params.path);
});

app.post('/api/v1/info/', function (req, res, err) {
    if (req.body) {
        const fileName = randomstring.generate(5) + '.pdf';
        res.json({
            path: 'http://localhost:3000/api/v1/file/' + generatePdf(req.body, fileName),
            fileName: fileName
        }).send();
    }
});

function generatePdf(info, fileName) {
    doc = new PDFDocument();
    console.log('here', fileName);
    doc.pipe(fs.createWriteStream(fileName));
    doc.text('Name: ' + info.name, 100, 100);
    doc.text('Address: ' + info.address, 100, 150);
    doc.text('Phone: ' + info.phone, 100, 200);
    doc.text('Email: ' + info.email, 100, 250);
    doc.end();
    return fileName;
};

app.listen(3000, function () {
    console.log('Example app running on  3000')
});
