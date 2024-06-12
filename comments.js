// Create web server
// npm install express
// npm install body-parser

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

app.get('/comments', function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
            return;
        }
        res.send(data);
    });
});

app.post('/comments', function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
            return;
        }
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
            if (err) {
                console.log(err);
                res.status(500).send('Server error');
                return;
            }
            res.send('Success');
        });
    });
});

app.listen(3000, function() {
    console.log('Server is running');
});