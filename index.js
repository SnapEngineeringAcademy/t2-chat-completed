var http = require('http');
var fs = require('fs');
var url = require('url');

const port = 8081;
const hostname = "127.0.0.1";

const server = http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  if(q.pathname == '/') q.pathname += "index.html";
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
});


// Prints a log once the server starts listening
server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
})
