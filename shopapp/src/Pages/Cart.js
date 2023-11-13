import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .post('http://localhost:5000/u/cart', {}, { withCredentials: true })
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteProduct = (id) => {
    axios
      .post('http://localhost:5000/u/cart/delete', {markedForDeletion: id}, { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="flex items-center justify-center bg-gray-800 text-white">
      <div className="container mx-auto p-4 flex flex-col gap-[10px]">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow-md bg-gray-700">
              <div className="flex justify-between items-center">
                <div>
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p>Size: {item.size}</p>
                </div>
                <div>
                    <button onClick={()=>deleteProduct(item.id)}>Remove</button>
                    <p className="text-white">${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="bg-gray-700 p-4 rounded shadow-md flex justify-between">
            <p className="text-lg font-semibold text-white">Total Amount:</p>
            <p className="text-xl font-bold text-white">${totalPrice}</p>
          </div>
        </div>
        <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Purchase
            </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
