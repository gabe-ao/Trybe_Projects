export const saveLocalStorage = (userEmail) => {
  localStorage.setItem('user', userEmail);
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

export const saveIngredients = (ingredients) => {
  localStorage.setItem('inProgressRecipes', ingredients);
};

export const cleanLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('mealsToken');
  localStorage.removeItem('cocktailsToken');
};

export const getEmail = () => {
  const response = localStorage.getItem('user');
  if (response) {
    return JSON.parse(response).email;
  }
  return 'Email not found';
};
