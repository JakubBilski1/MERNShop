import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Cart(props) {
    const [isCartPopupVisible, setCartPopupVisible] = useState(false);

    const handleCartMouseEnter = () => {
      setCartPopupVisible(true);
    };
  
    const handleCartMouseLeave = () => {
        setCartPopupVisible(false);
    };
  return (
    <div
        className="relative group"
        onMouseEnter={handleCartMouseEnter}
        onMouseLeave={handleCartMouseLeave}
        >
        <Link to={'/cart'} className="hover:text-gray-500 transition duration-300 linear">
        <FontAwesomeIcon icon={faCartShopping} />
        {props.cart.products && props.cart.products.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center text-white">
            {props.cart.products.length}
          </div>)}
        </Link>
        {isCartPopupVisible && (
            <Link to={'/cart'} className="absolute bg-gray-600 border p-4 shadow-md right-[-1vw] w-[15vw] flex flex-col gap-[1vh]">
              <p>Products in your cart</p>
              {props.cart.products &&
                props.cart.products.map((product) => (
                    <div className="flex items-center gap-[0.5vw]">
                    <img src={`/Images/${product.image}`} alt={product.title} className="w-[50px]"/>
                    <p className="text-white">{product.title}</p>
                    </div>
                ))}
        </Link>
        )}
    </div>
  )
}

export default Cart
