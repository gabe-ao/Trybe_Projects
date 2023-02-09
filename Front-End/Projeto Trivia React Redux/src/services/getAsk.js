const API_URL = 'https://opentdb.com/api.php?amount=5&token=';

const getAsk = async (token) => {
  const apiToken = await fetch(`${API_URL}${token}`);
  const apiTokenData = await apiToken.json();
  return apiTokenData;
};

export default getAsk;
