import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSocket } from '../Services/getSocket';

function Cart() {
  const [cart, setCart] = useState([]);
  const socket = getSocket();
  const deleteProduct = (id, size) => {
    socket.emit('delete-product', { id, size })
  }

  useEffect(() => {
    //socket.emit('get-cart')
    socket.emit('get-cart-guest')
    socket.on('cart', (cart) => {
      console.log(cart)
      setCart(cart)
    })
  }, [])

  const handleChange = async(e) => {
    const cartDetails = {
      quantity: e.target.value.split(',')[0],
      quantityId: e.target.value.split(',')[2],
      price: e.target.value.split(',')[1]
    }
    console.log(cartDetails)
    await socket.emit('update-quantity', cartDetails)
  }
  return (
    <div className="flex items-center justify-center bg-gray-800 text-white">
      <div className="container mx-auto p-4 flex flex-col gap-[10px]">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <div className="flex flex-col gap-4">
          {cart.products ?
            cart.products.map((product) => (
              <div to={`/products/p/${product.shortName}`} className="bg-gray-700 p-4 rounded shadow-md flex justify-between" key={product.id}>
                <Link to={`/products/p/${product.shortName}`} className="flex gap-4">
                  <img
                    src={`/Images/${product.image}`}
                    alt={product.title}
                    className="w-[100px] h-[100px] object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold">{product.title}</p>
                    <p className="text-lg font-semibold">
                      {product.fullPrice}zł
                    </p>
                    <p>Size {product.size}</p>
                  </div>
                </Link>
                <div className="flex gap-4">
                  <div>
                    <label className="flex gap-[0.5vw] items-center">Quantity:
                      <select
                        name="quantity"
                        id=""
                        className="bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-black h-[50%]"
                        onChange={e => handleChange(e)}
                      >
                        <option value="" disabled selected>Select</option>
                        {Array.from(Array(product.maxQuantity).keys()).map((quantity) => (
                          <option
                            value={`${quantity + 1},${product.price},${product.id}_${product.size}`}
                            key={quantity + 1}
                            className="text-black"
                          >
                            {quantity + 1}
                          </option>
                        ))}
                      </select>
                    </label>
                    <p>Selected quantity: {product.quantity}</p>
                  </div>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => deleteProduct(product.id, product.size)}>
                    Delete
                  </button>
                </div>
              </div>
            )) : (
              <div className="bg-gray-700 p-4 rounded shadow-md flex justify-between">
                <p className="text-lg font-semibold text-white">Cart is empty</p>
              </div>
            )}
        </div>
        <div>
          <div className="bg-gray-700 p-4 rounded shadow-md flex justify-between">
            <p className="text-lg font-semibold text-white">Total Amount:</p>
            <p className="text-xl font-bold text-white">{cart.formattedTotalPrice}zł</p>
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
