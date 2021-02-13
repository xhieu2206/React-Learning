import React, { useEffect, useRef, useState } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const {isLoading, data, error, sendRequest, clear} = useHttp()
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest(
          'https://react-hooks-update-a8416-default-rtdb.firebaseio.com/ingredients.json' + query,
          'GET'
        );
      }
    }, 500);
    return () => { // return về 1 function, và nếu đã return thì đây phải là 1 function (chúng ta có thể không return gì như chúng ta đã làm), function này sẽ run ngay trước useEffect tiếp theo được chạy, và đây gọi là cleanup function
      clearTimeout(timer);
    }
  }, [enteredFilter, sendRequest, inputRef]); // Nếu dependencies của chúng ta là [] thì cleanup function sẽ chạy khi component get unmounted (tương đương componentDidUnmount)

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients])

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading ...</span>}
          <input ref={inputRef} type="text" value={enteredFilter} onChange={e => {setEnteredFilter(e.target.value)}} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
