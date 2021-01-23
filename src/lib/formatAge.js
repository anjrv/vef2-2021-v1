function formatAge(created) {
  const date = new Date();
  const ms = date.getTime() - created;
  const days = Math.floor(ms / 1000 / 60 / 60 / 24);

  let since = 'Fyrir';
  since = (days > 30) ? `${since} ${Math.floor(days / 30)} mánuðum`
    : `${since} ${days} dögum`;

  since = `${since} síðan`;

  return since;
}

module.exports = formatAge;
