import React, { useEffect, useRef, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFilter}"`;

        fetch('https://react-hooks-update-a8416-default-rtdb.firebaseio.com/ingredients.json' + query)
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
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);
    return () => { // return về 1 function, và nếu đã return thì đây phải là 1 function (chúng ta có thể không return gì như chúng ta đã làm), function này sẽ run ngay trước useEffect tiếp theo được chạy, và đây gọi là cleanup function
      clearTimeout(timer);
    }
  }, [enteredFilter, onLoadIngredients, inputRef]); // Nếu dependencies của chúng ta là [] thì cleanup function sẽ chạy khi component get unmounted (tương đương componentDidUnmount)

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={enteredFilter} onChange={e => {setEnteredFilter(e.target.value)}} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
