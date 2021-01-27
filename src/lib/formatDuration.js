/**
 * Hjálparfall sem skilar lengd myndbandsins á lesanlegu formi
 *
 * @param {number} duration Sekúndur fyrir lengd myndbandsins
 * @returns {string} Strengur til að lýsa lengd myndbandsins
 */
function formatDuration(duration) {
  const minutes = Math.floor(duration / 60);
  let seconds = duration - minutes * 60;

  const time = `${minutes}:${seconds = (seconds < 10) ? `0${seconds}` : seconds}`;

  return time;
}

module.exports = formatDuration;
