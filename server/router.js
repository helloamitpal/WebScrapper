/* eslint-disable no-bitwise, no-mixed-operators */
const request = require('request');
const cheerio = require('cheerio');
const redis = require('redis');
const uuid = require('uuid');

const logger = require('./util//logger');

const REDIS_ROOT_NAME = 'SCRAPPE_RROOT';
const redisClient = redis.createClient(); // creates a new redis client

module.exports = (app) => {
  redisClient.on('connect', () => {
    logger.info('Redis connected');
  });

  // api to get all saved links in the store
  app.get('/api/savedLinks', (req, res) => {
    redisClient.get(REDIS_ROOT_NAME, (err, arr) => {
      if (err) {
        throw new Error('Something went wrong');
      }

      logger.info(`Data is found in Redis store: ${arr ? arr.length : 0}`);
      res.send(JSON.parse(arr) || []);
    });
  });

  // api to save link in the store
  app.post('/api/saveLink', (req, res) => {
    const { body } = req;

    if (!body) {
      throw new Error('Invalid body');
    }

    redisClient.get(REDIS_ROOT_NAME, (err, redisStr) => {
      if (err) {
        throw new Error('Something went wrong');
      }

      const redisObj = JSON.parse(redisStr);
      let arr = {};
      if (!redisObj) {
        arr = [{ ...body }];
      } else {
        arr = [...redisObj, body];
      }

      redisClient.set(REDIS_ROOT_NAME, JSON.stringify(arr), (seterr) => {
        if (seterr) {
          throw new Error('Something went wrong');
        }

        logger.info('Data is saved in Redis store');
        res.send(arr);
      });
    });
  });

  // api to remove link from saved store
  app.delete('/api/removeLink', (req, res) => {
    const { id: queryParamId } = req.query;

    if (!queryParamId) {
      throw new Error('Invalid param');
    }

    redisClient.get(REDIS_ROOT_NAME, (err, redisStr) => {
      if (err) {
        throw new Error('Something went wrong');
      }

      const links = JSON.parse(redisStr);
      const updatedArr = links.filter(({ id }) => (id !== queryParamId));

      redisClient.set(REDIS_ROOT_NAME, JSON.stringify(updatedArr), (seterr) => {
        if (seterr) {
          throw new Error('Something went wrong');
        }

        logger.info('Data is removed from Redis store');
        res.send(updatedArr);
      });
    });
  });

  app.get('/api/preview', (req, res) => {
    const { url } = req.query;

    if (!url) {
      throw new Error('Invalid param');
    }

    request(url, (error, response, html) => {
      if (error) {
        throw new Error('Problem in fetching the URL');
      }

      res.send(html);
    });
  });

  // api to get all links form a given url
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
        const id = uuid.v4();

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
