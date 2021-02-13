import React, { useReducer, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

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

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null
      }
    case 'RESPONSE':
      return {
        ...httpState,
        loading: false
      }
    case 'ERROR':
      return {
        loading: false,
        error: action.error
      }
    default: throw new Error('Should never get here!!!');
  }
}

const Ingredients = () => {
  console.log('RENDERING INGREDIENT');
  const [userIngredients, dispatch] = useReducer(ingredientsReducer, []);
  const [httpState, dispatchHttpState] = useReducer(httpReducer, { loading: false, error: null});

  const addIngredientHandler = useCallback(ingredient => {
    dispatchHttpState({
      type: 'SEND'
    });
    fetch('https://react-hooks-update-a8416-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(res => {
      dispatchHttpState({
        type: 'RESPONSE'
      });
      return res.json(); // return ra một promise
    }).then(resData => {
      dispatch({
        type: 'ADD',
        ingredient: {
          id: resData.name,
          ...ingredient
        }
      })
    }).catch(err => {
      dispatchHttpState({
        type: 'ERROR',
        error: err.message
      })
    });;
  }, []);

  const removeIngredientHandler = useCallback(id => {
    dispatchHttpState({
      type: 'SEND'
    });
    fetch(`https://react-hooks-update-a8416-default-rtdb.firebaseio.com/ingredients/${id}.json/`, {
      method: 'DELETE'
    }).then(res => {
      dispatchHttpState({
        type: 'RESPONSE'
      });
      dispatch({
        type: 'DELETE',
        id: id
      });
    }).catch(err => {
      dispatchHttpState({
        type: 'ERROR',
        error: err.message
      });
    });
  }, []);

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filteredIngredients);
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    })
  }, []);

  const clearError = useCallback(() => {
    dispatchHttpState({
      type: 'RESPONSE'
    });
  }, [])

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
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
