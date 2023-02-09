import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import { RecipeProvider } from './context/RecipeContext';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipeProvider>
      <ToastContainer
        theme="colored"
        toastStyle={ { backgroundColor: '#198754' } }
        autoClose={ 1500 }
      />
      <Switch>
        <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/foods/:id" component={ RecipeDetails } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/foods" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/" component={ Login } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
