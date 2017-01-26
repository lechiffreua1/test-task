let http = require('http');
let fs = require('fs');
let qs = require('querystring');
let path = require('path');

const port = 8080;
const filePath = path.join(__dirname, '/tmp.txt');

let server = http.createServer((req, res) => {

    if (req.method === 'POST') {
      let body = '';

      req.on('data', (data) => {
        body += data;
      });

      req.on('end', () => {
        fs.open(filePath, 'r', (err, fd) => {

          if (err && err.code === 'ENOENT') {

            fs.appendFile(filePath, body, (err) => {
              if (err) {
                errorCb(res, 500);
              }

              res.writeHead(200);
              res.end();
            });
          } else {

            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                errorCb(res, 500);
              }

              fs.appendFile(filePath, body, (err) => {
                  if (err) {
                    errorCb(res, 500);
                  }

                  if (data) {
                    let contentObj = {
                        content: data
                    };

                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(contentObj));
                  }

                  res.writeHead(200);
                  res.end();
              });
            });
          }
        });
      });
    } else {
      errorCb(res, 404);
    }
});

function errorCb(response, status) {
    response.writeHead(status);
    response.end();
}

server.listen(port, () => {
  console.log('Running on port 8080');
})
