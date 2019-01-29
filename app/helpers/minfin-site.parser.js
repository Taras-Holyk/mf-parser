const request = require('request-promise');
const cheerio = require('cheerio');

function getExchangeRates(params) {
  const parseUrl = generateUrlForParsing(params);
  const urlContent = getUrlContent(parseUrl);
  console.log(urlContent);
}

function generateUrlForParsing(params) {
  let url = 'https://minfin.com.ua/currency/';

  if ('date' in params) {
    url += params.date;
  }

  return url;
}

async function getUrlContent(url) {
  try {
    var options = {
      uri: url,
      transform: function (body) {
        return cheerio.load(body);
      }
    };

    return await request(options);
  } catch (e) {
    console.error(e);
  }
}

module.exports = {getExchangeRates};
