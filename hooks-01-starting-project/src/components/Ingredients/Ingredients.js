import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();

  /*
  useEffect(() => { // run after each component render (componentDidMount + componentDiđUpate)
    fetch('https://react-hooks-update-a8416-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []); // nếu dùng một empty array, đây sẽ tương tự với componentDidMount.
  */

  const addIngredientHandler = ingredient => {
    setIsloading(true);
    fetch('https://react-hooks-update-a8416-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(res => {
      setIsloading(false);
      return res.json(); // return ra một promise
    }).then(resData => {
      setUserIngredients(prevIngredients => {
        return [...prevIngredients, {
          id: resData.name, // sử dụng giá trị mà firebase return về để làm id.
          ...ingredient
        }]
      });
    }).catch(err => {
      setError(err.message);
    });;
  }

  const removeIngredientHandler = id => {
    setIsloading(true);
    fetch(`https://react-hooks-update-a8416-default-rtdb.firebaseio.com/ingredients/${id}.json/`, {
      method: 'DELETE'
    }).then(res => {
      setIsloading(false);
      setUserIngredients(prevIngredients => {
        const ingredients = prevIngredients.filter(ingredient => {
          return ingredient.id !== id;
        });
        return ingredients;
      });
    }).catch(err => {
      setError(err.message);
      setIsloading(false);
    });
  }

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
