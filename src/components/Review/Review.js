import React, { useEffect,useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    
    const [cart,setCart] = useState([])


    const RemoveProduct = (productKey) => {
        
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        //cart
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart)

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd=> pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProducts);

    },[])
    return (
        <div className="twin-container">
          <div className="product-container">
              {
                
                              
                 cart.map(pd=> <ReviewItem 
                 RemoveProduct={RemoveProduct}
                 key={pd.key}
                 product={pd}></ReviewItem>)
                              
                  
              }
          </div>
          <div className="cart-container">
              <Cart cart={cart}></Cart>
          </div>
        </div>
    );
};

export default Review;