const API_URL = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const apiToken = await fetch(API_URL);
  const apiTokenData = await apiToken.json();
  return apiTokenData.token;
};

export default getToken;
