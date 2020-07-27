const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = 'localhost';
const port = 3100;

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
        var fileurl;
        if (req.url == '/') fileurl = '/index.html';
        else fileurl = req.url;

        var filepath = path.resolve('./public' + fileurl);
        const fileext = path.extname(filepath);
        if (fileext == '.html') {
            fs.exists(filepath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileurl +
                        ' not found.</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filepath).pipe(res);

            });

        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileurl +
                ' is not a HTML file</h1></body></html>');
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method +
            ' not supported</h1></body></html>');
    }
});

server.listen(port, hostname);
console.log(`Server is running at http://${hostname}:${port} ...`);