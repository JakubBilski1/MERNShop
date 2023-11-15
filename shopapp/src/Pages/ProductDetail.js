import { useState, useEffect } from 'react';
import { getClickedProduct } from '../Services/ProductsService';
import Popup from '../Components/Products/Detail/Popup';
import { getSocket } from '../Services/getSocket';

function ProductDetail(props) {
  const [product, setProduct] = useState();
  const [count, setCount] = useState(0);
  const [sizeCart, setSizeCart] = useState('');
  const [popupInfo, setPopupInfo] = useState(null);
  const [popupColor, setPopupColor] = useState('');
  const socket = getSocket();

  useEffect(() => {
    const shortName = props.shortName
    const fetchProduct = async () => {
      try{
        const response = await getClickedProduct(shortName);
        setProduct(response);
        let totalCount = 0;
        Object.values(response.sizes).forEach((sizeCount) => {
          totalCount += sizeCount;
        });
        setCount(totalCount);
      }catch(err){
        console.log(err)
      }
    }
    socket.on('item-added-info', (msg, color) => {
      console.log('Message w sockecie: ', msg)
      setPopupInfo(msg);
      setPopupColor(color);
    })
    fetchProduct();
  }, []);

  const closePopup = () => {
    setPopupInfo(null);
    setPopupColor('');
  };

  /*useEffect(() => {
    try{
      socket.emit('add-to-cart', {id: product.id, size: sizeCart})
      setInfo('Item added to cart')
      setError('');
    }catch(err){
      console.log(err)
    }
  }, [cart]);*/

  const handleSize = (e) => {
    setSizeCart(e.target.value);
  }

  const addToCart = async(e) => {
    e.preventDefault()
    try{
      const cartItems = {
        cartProductId: `${product.id}_${sizeCart}`,
        "_id": product._id, 
        "id": product.id, 
        "size": sizeCart, 
        "quantity": 1, 
        "fullPrice": product.price
      } 
      socket.emit('add-to-cart', cartItems)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="bg-gray-900 text-white p-4 h-full">
      {product &&
        <div className="flex">
          <div className="w-1/2">
            <img src={`/Images/${product.image}`} alt={product.title} />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="mb-2">{product.type}</p>
            <p className="mb-2">{product.brand}</p>
            <p className="mb-2">{product.price}zł</p>
            <p className="mb-2 w-1/2">{product.description}</p>
            <div className="flex gap-[10px]">
              {Object.entries(product.sizes).map((size, index) => {
                return(
                  size[1] === 0 ?
                  <button key={index} className="bg-gray-600 px-[25px] py-[10px]" disabled={true} >{size[0]} <span className="text-gray-400">({size[1]})</span></button>
                  :
                  <label key={index} className={`inline-block px-[25px] py-[10px] rounded-md cursor-pointer hover:bg-gray-700 hover:text-white ${
                    size[0] === sizeCart ? 'bg-gray-700 text-white' : 'bg-gray-600 text-white'
                  }`}>
                    <input 
                      type="radio" 
                      className="hidden" 
                      name="size" 
                      value={size[0]} 
                      onChange={e=>handleSize(e)}
                      checked={size[0] === sizeCart} />
                    {size[0]} <span className="text-gray-400">({size[1]})</span>
                  </label>
                )
              })}
            </div>
            <p>Currently in stock: {count}</p>
            {popupInfo && (
              <Popup info={popupInfo} color={popupColor} onClose={closePopup} />
            )}
          </div>
        </div>
      }
      <div className="flex justify-end gap-4">
        <button className="bg-gray-700 rounded-md p-[5px]">Buy Now</button>
        <button className="bg-gray-700 rounded-md p-[5px]" onClick={e=>addToCart(e)}>Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;
