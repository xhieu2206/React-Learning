import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngredients => {
      return [...prevIngredients, {
        id: Math.random().toString(),
        ...ingredient
      }]
    });
  }

  const removeIngredientHandler = id => {
    setUserIngredients(prevIngredients => {
      const ingredients = prevIngredients.filter(ingredient => {
        return ingredient.id !== id;
      });
      return ingredients;
    });
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
