const request = require('request');
const cheerio = require('cheerio');

module.exports = (app) => {
  app.get('/api/scrappers', (req, res) => {
    const { url } = req.query;

    if (!url) {
      throw new Error('Invalid param');
    }

    request(url, (error, response, html) => {
      if (error) {
        throw new Error('Problem in fetching the URL');
      }

      const links = [];
      const $ = cheerio.load(html);
      $('a').each(function callback() {
        const $link = $(this);
        links.push({
          text: $link.text(),
          href: $link.attr('href')
        });
      });

      res.send(links);
    });
  });

  return app;
};
