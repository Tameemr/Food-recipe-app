import React, { useState, useEffect } from "react";
import Recipe from "./recipe";
import "./App.css";

function App() {
  const APP_ID = "09ca15f4";
  const APP_KEY = "8f2301b464ce90ba0e2950d2be0e2047";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  const getSearch = (e) => {
    setSearch(e.target.value);
  };

  const getQuery = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getQuery} className="search-form">
        <input
          className="serach-bar"
          type="text"
          value={search}
          onChange={getSearch}
        ></input>
        <button className="search-button" type="submit" onSubmit={getQuery}>
          Search
        </button>
      </form>
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
}

export default App;
