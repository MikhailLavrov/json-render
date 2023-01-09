const DATA_URL = '../data.json';

const getData = (onSuccess) => {
  fetch(DATA_URL)
    .then(response => response.ok ? response.json() : console.log(`${response.status} — ${response.statusText}`))
    .then(items => onSuccess(items))
    .catch(() => alert('Damn! ʕ•́ᴥ•̀ʔ'))
};

export {getData};
