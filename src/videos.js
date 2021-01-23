const util = require('util');
const fs = require('fs');
const express = require('express');

const router = express.Router();

const readFileAsync = util.promisify(fs.readFile);

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function readVideos() {
  const file = await readFileAsync('./videos.json');
  const json = JSON.parse(file);
  return json;
}

async function listVideos(req, res) {
  const title = 'Fræðslumyndbandaleigan';
  const json = await readVideos();
  const { videos } = json;
  const { categories } = json;

  res.render('videos', { title, videos, categories });
}

async function video(req, res, next) {
  const json = await readVideos();
  const { videos } = json;
  const { id } = req.params;

  // const foundVideo = videos.find((a) => a.id === id);
  const foundVideo = videos.find((a) => a.id === 1);

  if (!foundVideo) {
    return next();
  }

  const { title } = foundVideo;

  return res.render('video', { title, video: foundVideo });
}

router.get('/', catchErrors(listVideos));
router.get('/:id', catchErrors(video));

module.exports = router;
