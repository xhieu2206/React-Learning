import React, { useState } from 'react';

export const ProductContext = React.createContext({
  products: [],
  toggleFav: (id) => {}
});

export default props => {
  const [products, setProducts] = useState([
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }
  ]);


  const toggleFavorite = id => {
    setProducts(currentProductList => {
      const prodIndex = currentProductList.findIndex(
        p => p.id === id
      );
      const newFavStatus = !currentProductList[prodIndex].isFavorite;
      const updatedProducts = [...currentProductList];
      updatedProducts[prodIndex] = {
        ...currentProductList[prodIndex],
        isFavorite: newFavStatus
      };
      return updatedProducts;
    })
  }

  return (
    <ProductContext.Provider value={{
      products: products,
      toggleFav: toggleFavorite
    }}>
      {props.children}
    </ProductContext.Provider>
  )
}