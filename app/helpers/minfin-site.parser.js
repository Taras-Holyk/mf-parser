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
    const options = {
      uri: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
      },
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
