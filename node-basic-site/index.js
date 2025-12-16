const http = require('node:http');
const fs =  require('node:fs');

// creating a local server
const server = http.createServer((req, res) => {
  let url = '';
  if (req.url === '/') url = './index.html'
  else if (req.url === '/about') url = './about.html'
  else if (req.url === '/contact-me') url = './contact-me.html'
  else url = './404.html';

  fs.readFile(url, (error, data) => {
    if (error) {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end('Server error');
    } else {
      res.writeHead(res.statusCode || 200, {'Content-Type': 'text/html'});
      res.end(data)
    }
  })

});

server.listen(8080, () => console.log('Server running at  http://localhost:8080/'));