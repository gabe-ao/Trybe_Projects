const oneMeal = require('./oneMeal');


const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (
      url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata' ||
      url === 'https://www.themealdb.com/api/json/v1/1/random.php' ||
      url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771' ||
      url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977'
    )
      return Promise.resolve(oneMeal);
  },
});

module.exports = fetch;
