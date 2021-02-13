import React, { useReducer, useCallback, useMemo, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientsReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ingredient => ingredient.id !== action.id);
    default:
      throw new Error('Should not get here!');
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientsReducer, []);
  const {isLoading, data, error, sendRequest, reqExtra, reqIdentifier, clear} = useHttp();

  useEffect(() => {
    if (reqIdentifier === 'REMOVE_INGREDIENT' && !isLoading && !error) {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (reqIdentifier === 'ADD_INGREDIENT' && !isLoading && data && !error) {
      dispatch({
        type: 'ADD',
        ingredient: {
          id: data.name,
          ...reqExtra
        }
      });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-hooks-update-a8416-default-rtdb.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT');
  }, [sendRequest]);

  const removeIngredientHandler = useCallback(id => {
    sendRequest(
      `https://react-hooks-update-a8416-default-rtdb.firebaseio.com/ingredients/${id}.json/`,
      'DELETE',
      null,
      id,
      'REMOVE_INGREDIENT'
    )
  }, [sendRequest]);

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filteredIngredients);
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    })
  }, []);

  const clearError = useCallback(() => {
    clear();
  }, [clear])

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    )
  }, [userIngredients, removeIngredientHandler])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
