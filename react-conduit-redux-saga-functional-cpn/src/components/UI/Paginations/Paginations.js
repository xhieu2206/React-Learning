import React from 'react';

import Pagination from './Pagination/Pagination';

const Paginations = props => {
  let pagesArr = [];
  for (let i = 1; i <= props.totalPage; i++) {
    pagesArr.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pagesArr.map(page => {
          return (
            <Pagination
              key={page}
              active={props.currentPage === page}
              pageNumber={page}
              clicked={() => props.clicked(page)}
            />
          )
        })}
      </ul>
    </nav>
  )
}

export default Paginations;
