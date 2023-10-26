import React from 'react'
import "../index.css"
import logo from '../Images/logo-no-background.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="flex justify-between items-center p-[20px]" style={{background: 'rgb(41, 41, 41)'}}>
            <img src={logo} alt="logo" className="w-[150px]" />
            <div className="flex gap-[15px] text-white">
                <Link to={'/'} className="hover:text-gray-500 transition duration-300 linear">Home</Link>
                <a href="/" className="hover:text-gray-500 transition duration-300 linear">About</a>
                <Link to={'/products'} className="hover:text-gray-500 transition duration-300 linear">Products</Link>
                <a href="/" className="hover:text-gray-500 transition duration-300 linear">Contact</a>
                <a href="/" className="hover:text-gray-500 transition duration-300 linear">Cart</a>
            </div>
        </header>
    )
}
export default Header
