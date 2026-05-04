import Card from '../Card/Card';

import './ProductsContainer.css'

const ProductsContainer = ({filterdata}) => {
    console.log(filterdata)
  return (
    
    <div className="products-container">
      <h2>Recommended</h2>
      <div className="container">
        {filterdata.map(product => {
          return(
            <Card
              image = {product.img}
              title = {product.title}
              reviews = {product.reviews}
              prevPrice = {product.prevPrice}
              newPrice = {product.newPrice}
            />
          )
        })}     
      </div>

    </div>
  );
};

export default ProductsContainer;