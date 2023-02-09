import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const mockFavoriteRecipes = [
  {
    id: '357852',
    type: 'drink',
    nationality: 'Colombiana',
    category: '',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aliento de Fallecido',
    image: drinkIcon,
    doneDate: '17/08/1863',
    tags: [
      'Deadly',
      'Smelly',
    ],
  },
  {
    id: '194862',
    type: 'food',
    nationality: 'Sueca',
    category: 'Lanche',
    alcoholicOrNot: '',
    name: 'Surstromming',
    image: mealIcon,
    doneDate: '23/05/2019',
    tags: [
      'Fish',
      'Stink',
    ],
  },
  {
    id: '648354',
    type: 'drink',
    nationality: 'Iraniana',
    category: '',
    alcoholicOrNot: 'Non-Alcoholic',
    name: 'Aryan',
    image: drinkIcon,
    doneDate: '09/03/2022',
    tags: [
      'Yogurt',
      'Salt',
    ],
  },
  {
    id: '789423',
    type: 'drink',
    nationality: 'Malauiana',
    category: '',
    alcoholicOrNot: 'Non-Alcoholic',
    name: 'Kachumbari-Liquid',
    image: drinkIcon,
    doneDate: '07/10/1997',
    tags: [
      'Simple',
      'Healthy',
    ],
  },
];

export default mockFavoriteRecipes;
