import React from 'react'
import "../index.css"
import logo from '../Images/logo-no-background.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Header(props) {
    return (
        <header className="flex justify-between items-center p-[20px] sticky top-0 w-[100%]" style={{background: 'rgb(41, 41, 41)'}}>
            <Link to={'/'}><img src={logo} alt="logo" className="w-[150px]" /></Link>
            <div className="flex gap-[15px] text-white">
                <Link to={'/'} className="hover:text-gray-500 transition duration-300 linear">Home</Link>
                <Link to={'/about'} className="hover:text-gray-500 transition duration-300 linear">About</Link>
                <Link to={'/products'} className="hover:text-gray-500 transition duration-300 linear">Products</Link>
                <Link to={'/contact'} className="hover:text-gray-500 transition duration-300 linear">Contact</Link>
                {props.data.length!==0 && <p>Witaj, {props.data.nick}</p>}
                <Link to={'/cart'} className="hover:text-gray-500 transition duration-300 linear"><FontAwesomeIcon icon={faCartShopping} /></Link>
                <Link to={props.data.length!==0 ? '/u/dashboard' : '/login'}><FontAwesomeIcon icon={faUser} /></Link>
            </div>
        </header>
    )
}
export default Header
