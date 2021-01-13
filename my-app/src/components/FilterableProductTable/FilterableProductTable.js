import React from 'react';

import SearchBar from './SearchBar/SearchBar';
import ProductTable from './ProductTable/ProductTable';

const DATA = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [...DATA],
      term: '',
      isInStock: false
    }

    this.filterProducts = this.filterProducts.bind(this);
  }

  onSearchInputChangedHandler = (event) => {
    this.setState({
      term: event.target.value.trim()
    }, () => {
      this.filterProducts(this.state.term, this.state.isInStock);
    });
  }

  onToggleCheckBoxHandler = (event) => {
    this.setState({
      isInStock: event.target.checked
    }, () => {
      this.filterProducts(this.state.term, this.state.isInStock);
    });
  }

  filterProducts(term, isInStock) {
    let result = []
    const products = [...DATA].map(pro => {
      pro.name = pro.name.toLowerCase();
      return pro;
    }).sort((a, b) => {
      if (a.category < b.category) return -1;
      if (a.category > b.category) return -1;
      return 0;
    });

    if (term === '' && !isInStock) {
      result = [...products];
    } else if (term === '' && isInStock) {
      result = products.filter(pro => pro.stocked)
    } else {
      result = products.filter(pro => {
        if (!isInStock && pro.name.includes(term.toLowerCase())) {
          return true;
        } else if (isInStock && pro.name.includes(term.toLowerCase()) && pro.stocked) {
          return true;
        } else return false;
      });
    }

    this.setState({
      products: [...result]
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          term={this.state.term}
          isInStock={this.state.isInStock}
          changed={this.onSearchInputChangedHandler}
          toggleCheckbox={this.onToggleCheckBoxHandler}
        />
        <ProductTable
          products={this.state.products}
        />
      </div>
    )
  }
}

export default FilterableProductTable;
