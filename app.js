const path = require('path');
const express = require('express');

const videoApp = require('./src/videos');

const formatAge = require('./src/lib/formatAge');
const formatDuration = require('./src/lib/formatDuration');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.formatAge = formatAge;
app.locals.formatDuration = formatDuration;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/videos', express.static(path.join(__dirname, 'public/videos')));
app.use('/', videoApp);

/**
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware sem nota á
 */
function notFoundHandler(req, res, next) { // eslint-disable-line
  const title = 'Fannst ekki';
  const message = 'Efnið finnst ekki.';
  res.status(404).render('error', { title, message });
}

/**
 *
 * @param {object} err Villa sem kom upp í vinnslu
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {object} next næsta middleware sem nota á
 */
function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err); // eslint-disable-line
  const title = 'Villa kom upp';
  const message = '';
  res.status(500).render('error', { title, message });
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`); // eslint-disable-line
});
