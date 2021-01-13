import React from 'react';
import classes from './ProductTable.module.css';

import ProductCategoryRow from './ProductCategoryRow/ProductCategoryRow';
import ProductRow from './ProductRow/ProductRow';

const productTable = props => {
  let rows = [];
  let lastCategory = null;

  props.products.forEach(pro => {
    if (lastCategory !== pro.category) {
      rows.push(
        <ProductCategoryRow category={pro.category} key={pro.category} />
      )
    }
    rows.push(
      <ProductRow
        key={pro.name}
        name={pro.name}
        price={pro.price}
        stocked={pro.stocked}
      />
    );
    lastCategory = pro.category;
  })

  return (
    <table className={classes.ProductTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
        <tbody>
          {rows}
        </tbody>
    </table>
  )
}

export default productTable;
