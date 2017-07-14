var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
PDFDocument = require('pdfkit');
const fs = require('fs');

var app = express();

// Add headers
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/api/v1/file/:path', function (req, res, err) {
    console.log('here', req.params.path);
    res.sendFile(__dirname + '/'+req.params.path);
});

app.post('/', function (req, res, err) {
    console.log('Info is', req.body);
    if (req.body) {

        generatePdf(req.body);
    }
    res.json({ path: 'http://localhost:3000/api/v1/file/' + generatePdf(req.body) }).send();
});

function generatePdf(info) {
        doc = new PDFDocument();
        const fileName = 'output.pdf';
        doc.pipe( fs.createWriteStream(fileName) );
        doc.text('Name: ' + info.name ,100,100);
        doc.text('Address: ' + info.address ,100,150);
        doc.text('Phone: ' + info.phone ,100,200);
        doc.text('Email: ' + info.email ,100,250);
        doc.end();
        return fileName;
};

app.listen(3000, function () {
    console.log('Example app running on  3000')
});
