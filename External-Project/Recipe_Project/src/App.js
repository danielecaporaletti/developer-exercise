import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './recipe/Recipe';

const App = () => {

  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  
  useEffect(() => {
    fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      .then( (response) => response.json())
      .then( (data) => {
        console.log(data.hits)
        setRecipes(data.hits) })
      .catch( (err) => console.log(err));
      
  }, [query] )
  

  return (
    <div className='App'>
      <form className='search-form' onSubmit={(e) => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
      }}> 
        <input className='search-bar' type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className='search-button' type='submit'>
          Search
        </button>
      </form>
      <div className='container'>
      {recipes.length === 0 ? (
          <h1 className='error'>Nessun risultato di ricerca, oppure, supermanto limite 10 richieste al min.</h1>
        ) : (
          recipes.map((recipe, index) => (
            <Recipe
              key={index}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App;
