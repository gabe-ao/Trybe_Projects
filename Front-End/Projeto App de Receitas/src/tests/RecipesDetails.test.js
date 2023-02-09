import React from 'react';
import { within, screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';


const mockCorba = {

      'idMeal': '52977',
      'strMeal': 'Corba',
      'strDrinkAlternate': null,
      'strCategory': 'Side',
      'strArea': 'Turkish',
      'strInstructions': 'Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\nIn a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.',
      'strMealThumb': 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      'strTags': 'Soup',
      'strYoutube': 'https://www.youtube.com/watch?v=VVnZd8A84z4',
      'strIngredient1': 'Lentils',
      'strIngredient2': 'Onion',
      'strIngredient3': 'Carrots',
      'strIngredient4': 'Tomato Puree',
      'strIngredient5': 'Cumin',
      'strIngredient6': 'Paprika',
      'strIngredient7': 'Mint',
      'strIngredient8': 'Thyme',
      'strIngredient9': 'Black Pepper',
      'strIngredient10': 'Red Pepper Flakes',
      'strIngredient11': 'Vegetable Stock',
      'strIngredient12': 'Water',
      'strIngredient13': 'Sea Salt',
      'strIngredient14': '',
      'strIngredient15': '',
      'strIngredient16': '',
      'strIngredient17': '',
      'strIngredient18': '',
      'strIngredient19': '',
      'strIngredient20': '',
      'strMeasure1': '1 cup ',
      'strMeasure2': '1 large',
      'strMeasure3': '1 large',
      'strMeasure4': '1 tbs',
      'strMeasure5': '2 tsp',
      'strMeasure6': '1 tsp ',
      'strMeasure7': '1/2 tsp',
      'strMeasure8': '1/2 tsp',
      'strMeasure9': '1/4 tsp',
      'strMeasure10': '1/4 tsp',
      'strMeasure11': '4 cups ',
      'strMeasure12': '1 cup ',
      'strMeasure13': 'Pinch',
      'strMeasure14': ' ',
      'strMeasure15': ' ',
      'strMeasure16': ' ',
      'strMeasure17': ' ',
      'strMeasure18': ' ',
      'strMeasure19': ' ',
      'strMeasure20': ' ',
      'strSource': 'https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/',
      'dateModified': null
}

describe('Testa CategoryFilters foods', () => {
  test('Testa category filters foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

  
    const allBtn = await screen.findByTestId('All-category-filter');
    userEvent.click(allBtn)
    
    await waitFor(() => screen.findByTestId('0-card-img'), {timeout: 5000})
    const corba = await screen.findByTestId('0-card-img')
    userEvent.click(corba)

    expect(await screen.findByAltText(/corba/i))

    expect(await screen.findByAltText(/botão de compartilhar/i))
    expect(await screen.findByAltText(/botão de favoritar/i))
    expect(await screen.findByRole('heading', {name: /side/i}))
    
    const ingName = await screen.findByTestId('0-ingredient-name-and-measure')
    expect(ingName).toBeInTheDocument()

    const instru = await screen.findByTestId('instructions')
    expect(instru).toBeInTheDocument()

    const youtubeVideo = await screen.findByTestId('video')
    expect(youtubeVideo).toBeInTheDocument()
    
    const recomHead = screen.getByRole('heading', {name: /recomendations/i})
    expect(recomHead).toBeInTheDocument()

    const recoList = await screen.findByTestId('0-recomendation-card')
    expect(recoList).toBeInTheDocument()


    
    
    const startRecipe = await screen.findByTestId('start-recipe-btn')
    expect(startRecipe).toBeInTheDocument()

    userEvent.click(startRecipe)
    expect(history.location.pathname).toBe('/foods/52977/in-progress')

  });
});

describe('Testa CategoryFilters drinks', () => {
  test('Testa category filters drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const allBtn = await screen.findByTestId('All-category-filter');
    userEvent.click(allBtn)
    
    await waitFor(() => screen.findByTestId('0-card-img'), {timeout: 5000})
    const corba = await screen.findByTestId('0-card-img')
    userEvent.click(corba)

    expect(await screen.findByAltText(/gg/i))
    expect(await screen.findByAltText(/botão de compartilhar/i))
    expect(await screen.findByAltText(/botão de favoritar/i))
    expect(await screen.findByRole('heading', {name: /Optional alcohol/i}))
    
    const ingName = await screen.findByTestId('0-ingredient-name-and-measure')
    expect(ingName).toBeInTheDocument()

    const instru = await screen.findByTestId('instructions')
    expect(instru).toBeInTheDocument()

    const recomHead = screen.getByRole('heading', {name: /recomendations/i})
    expect(recomHead).toBeInTheDocument()

    const recoList = await screen.findByTestId('0-recomendation-card')
    expect(recoList).toBeInTheDocument()

    const startRecipe = await screen.findByTestId('start-recipe-btn')
    expect(startRecipe).toBeInTheDocument()

    userEvent.click(startRecipe)
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    screen.getByText('Receitas em progresso')
    expect(startRecipe).not.toBeInTheDocument()

  });
});

describe('Testa botão de copiar link', () => {
  test('Testa compartilhar', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977');

    await waitFor(() => screen.findByTestId('share-btn'), {timeout: 5000})
    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument()
    window.document.execCommand = jest.fn(() => true)
    //fireEvent.click(screen.getByTestId('share-btn'))
    userEvent.click(shareBtn)
    expect(await screen.findByText('Link copied!'))


  });
});

describe('Testa botão de favoritar', () => {
  test('Testa favoritos', async () => {
    // global.fetch = jest.fn(async () => ({
    //   json: async() => mockCorba
    // })) 

    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977');
    await waitFor(() => screen.getByRole('heading', {
    name: /corba/i}), {timeout: 5000})

    const favBtn = screen.getByAltText('botão de favoritar');
    expect(localStorage.getItem('favoriteRecipes')).toBeNull();

    expect(favBtn).toHaveAttribute('src', 'whiteHeartIcon.svg' );
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', 'blackHeartIcon.svg' );
    userEvent.click(favBtn);

    expect(favBtn).toHaveAttribute('src', 'whiteHeartIcon.svg' );
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', 'blackHeartIcon.svg' );
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1)

    const response = localStorage.getItem('favoriteRecipes');
  
    const obj = JSON.parse(response)[0];
      
    expect(obj.name).toEqual('Corba');

    expect(obj).toEqual(
    {
  "id": "52977",
  "type": "food",
  "nationality": "Turkish",
  "category": "Side",
  "alcoholicOrNot": "",
  "name": "Corba",
  "image": "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
});

  });

// describe('Testa botão de favoritar', () => {
//   test('Testa favoritos', async () => {

//     const { history } = renderWithRouter(<App />);
//     //     const inProgressRecipes = {
//     //       meals: {
//     //         52977: [],
//     //       },
//     //     };
//     // localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
//     history.push('/foods/52977');
//     await waitFor(() => screen.getByRole('heading', {
//     name: /corba/i}), {timeout: 5000})
     
//     // const meals = localStorage.getItem('inProgressRecipes')

//     const startRecipe = await screen.findByTestId('start-recipe-btn')
//     userEvent.click(startRecipe)
//     await waitFor(() => screen.getByText(/corba/i), {timeout: 5000})
    
//     const ingBtn = screen.getByRole('checkbox', { name: /tomato puree/i })
//     userEvent.click(ingBtn)
    
//     history.goBack()
//     await waitFor(() => screen.getByText(/corba/i), {timeout: 5000})

//     within(startRecipe).getByText(/Continue Recipe/i)

//     }); 
//  });
});

