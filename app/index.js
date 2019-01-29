const config = require('dotenv').config();
if (config.error) {
  throw config.error;
}

const url = require('url');
const http = require('http');
const port = process.env.APP_PORT || 3001;

const minfinSiteParser = require('./helpers/minfin-site.parser');

const server = http.createServer();

server.on('request', (req, res) => {
  const exchangeRates = minfinSiteParser.getExchangeRates(url.parse(req.url,true).query);


  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({a: 2}));
  res.end();
});

server.on('error', (err) => {
  console.log(err.stack);
});

server.listen(port, () => {
  console.log(`App running on the port ${port}`);
});
