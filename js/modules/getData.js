const getData = (onSuccess) => {
  fetch('../../data.json')
    .then(response => response.ok ? response.json() : console.log(`${response.status} — ${response.statusText}`))
    .then(items => onSuccess(items))
    .catch(() => alert('Damn! Not today, bro :('))
};

export {getData};
