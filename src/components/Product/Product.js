import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (Props) => {
   
    const {img,name,seller,price,stock,key} = Props.product;
   
    return (
        <div className="product">
            <div>
               <img src={img} alt=""/>
            </div>
    <div><h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
            <br/>
    <p><small>by: {seller}</small></p>
    <p>${price}</p>
    <p><small>Only {stock} left in stock - Order soon</small></p>
 {Props.showAddToCart &&   
  <button 
    className="main-button" onClick=
    {()=> Props.handleAddProduct(Props.product)}>
        <FontAwesomeIcon icon={faShoppingCart} /> add to cart
        </button>
 }           
 </div>
            

    
        </div>
    );
};

export default Product;