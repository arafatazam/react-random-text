var express = require('express');
var request = require('request');

var app = express();


app.use(express.static('public'));

app.use('/proxy', function(req, res) {
    var apiServerHost = 'http://loripsum.net';
    var url = apiServerHost + req.url;
    req.pipe(request(url)).pipe(res);
});


app.listen(8081);