/* eslint-disable no-bitwise, no-mixed-operators */
const request = require('request');
const cheerio = require('cheerio');

// Public Domain/MIT
const generateUUID = () => {
  let timestamp = new Date().getTime(); // Timestamp
  let timestamp2 = (performance && performance.now && (performance.now() * 1000)) || 0; // Time in microseconds since page-load or 0 if unsupported

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (val) => {
    let random = Math.random() * 16; // random number between 0 and 16
    if (timestamp > 0) {
      // Use timestamp until depleted
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      // Use microseconds since page-load if supported
      random = (timestamp2 + random) % 16 | 0;
      timestamp2 = Math.floor(timestamp2 / 16);
    }
    return (val === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
  });
};

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
        const id = generateUUID();

        links.push({
          text: $link.text(),
          href: $link.attr('href'),
          id
        });
      });

      res.send(links);
    });
  });

  return app;
};
