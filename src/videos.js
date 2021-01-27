const util = require('util');
const fs = require('fs');
const express = require('express');

const router = express.Router();

const readFileAsync = util.promisify(fs.readFile);
/**
 * Higher-order fall sem umlykur middleware með villumeðhöndlun
 *
 * @param {function} fn Middleware sem gripa á villur fyrir
 * @returns {function} Middleware sem inniheldur villumeðhöndlun
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/**
 * Les gögn async úr JSON skrá
 *
 * @returns {object} Gögn úr JSON
 */
async function readVideos() {
  const file = await readFileAsync('./videos.json');
  const json = JSON.parse(file);
  return json;
}

/**
 * Route handler til að birta lista af myndböndum
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 */
async function listVideos(req, res) {
  const json = await readVideos();
  const title = 'Fræðslumyndbandaleigan';
  const { videos } = json;
  const { categories } = json;

  res.render('videos', { title, videos, categories });
}

/**
 * Route handler til að birta myndband. Ef myndband finnst ekki í JSON skrá
 * er kallað í next() sem endar í 404 handler.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
async function video(req, res, next) {
  const json = await readVideos();
  const { videos } = json;
  const { id } = req.params;
  const foundVideo = videos.find((a) => a.id === Number(id));

  if (!foundVideo) {
    return next();
  }

  const { title } = foundVideo;

  return res.render('video', { title, videos, video: foundVideo });
}

router.get('/', catchErrors(listVideos));
router.get('/:id', catchErrors(video));

module.exports = router;
