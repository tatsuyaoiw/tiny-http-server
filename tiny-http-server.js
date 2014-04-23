#!/usr/bin/env node

var commander = require('commander');

commander
  .option('-p, --port [num]', 'port number the server listen to')
  .option('-s, --status [code]', 'http status code')
  .option('-b, --body [content]', 'http body content')
  .parse(process.argv);

var port = commander.port || 3333;
var status = commander.status || 200;
var body = commander.body || '';

var http = require('http');

var server = http.createServer(function(req, res) {
  console.log('[%s] "%s %s" "%s"', (new Date).toUTCString(), req.method, req.url, req.headers['user-agent']);
  res.setHeader('Content-Length', body.length);
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = status;
  res.end(body);
});

server.listen(port, function() {
  console.log('Listening on ' + port);
});
