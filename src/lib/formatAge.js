function formatAge(created) {
  const date = new Date();
  const ms = date.getTime() - created;
  const days = Math.floor(ms / 1000 / 60 / 60 / 24);

  let since = 'Fyrir';

  if (days > 365) {
    const years = Math.floor(days / 365);
    since = (years > 1) ? `${since} ${years} árum`
      : `${since} ${years} ári`;
  } else if (days > 30) {
    const months = Math.floor(days / 30);
    since = (months > 1) ? `${since} ${months} mánuðum`
      : `${since} ${months} mánuði`;
  } else if (days > 0) {
    since = (days > 1) ? `${since} ${days} dögum`
      : `${since} ${days} degi`;
  } else {
    const hours = Math.floor(ms / 1000 / 60 / 60);
    since = (hours > 1) ? `${since} ${hours} klukkustundum`
      : `${since} ${hours} klukkustund`;
  }

  since = `${since} síðan`;
  return since;
}

module.exports = formatAge;
