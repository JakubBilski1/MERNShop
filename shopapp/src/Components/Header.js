import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import logo from '../Images/logo-no-background.png';
import '../index.css';

function Header(props) {
  const [isCartPopupVisible, setCartPopupVisible] = useState(false);

  const handleCartMouseEnter = () => {
    setCartPopupVisible(true);
  };

  const handleCartMouseLeave = () => {
    setCartPopupVisible(false);
  };

  return (
    <header className="flex justify-between items-center p-5 sticky top-0" style={{background: 'rgb(41, 41, 41)'}}>
      <Link to={'/'}>
        <img src={logo} alt="logo" className="w-32" />
      </Link>
      <div className="flex gap-5 text-white">
        <Link to={'/'} className="hover:text-gray-500 transition duration-300 linear">
          Home
        </Link>
        <Link to={'/about'} className="hover:text-gray-500 transition duration-300 linear">
          About
        </Link>
        <Link to={'/products'} className="hover:text-gray-500 transition duration-300 linear">
          Products
        </Link>
        <Link to={'/contact'} className="hover:text-gray-500 transition duration-300 linear">
          Contact
        </Link>
        {props.data.length !== 0 && <p>Witaj, {props.data.nick}</p>}
        <div
          className="relative group"
          onMouseEnter={handleCartMouseEnter}
          onMouseLeave={handleCartMouseLeave}
        >
          <Link to={'/cart'} className="hover:text-gray-500 transition duration-300 linear">
            <FontAwesomeIcon icon={faCartShopping} />
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
        <Link to={props.data.length !== 0 ? '/u/dashboard' : '/login'}>
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </header>
  );
}

export default Header;
