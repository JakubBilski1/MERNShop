import axios from 'axios';
import { useState, useEffect } from 'react';

function ProductDetail(props) {
  const [product, setProduct] = useState();
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState({});
  const [sizeCart, setSizeCart] = useState('');
  const [info, setInfo] = useState();
  
  useEffect(() => {
    const shortName = props.shortName;
    axios
      .post(`http://localhost:5000/products/p/${shortName}`)
      .then((res) => {
        setProduct(res.data);
        let totalCount = 0;
        Object.values(res.data.sizes).forEach((sizeCount) => {
          totalCount += sizeCount;
        });
        setCount(totalCount);
      })
      .catch((err) => console.log(err));
  }, [props.shortName]);

  useEffect(() => {
    if(cart.id && cart.size){
      axios.post('http://localhost:5000/u/updateData', {cart: cart}, {withCredentials: true})
      .then(res => setInfo(res.data))
      .catch(err => console.log(err))
    }
    if(info){
      alert("dodano do koszyka")
    }
  }, [cart])

  const handleSize = (e) => {
    setSizeCart(e.target.value);
  }

  const addToCart = () => {
    setCart(prevState => ({...prevState, "id": product.id, "size": sizeCart}))
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
          </div>
        </div>
      }
      <div className="flex justify-end gap-4">
        <button className="bg-gray-700 rounded-md p-[5px]">Buy Now</button>
        <button className="bg-gray-700 rounded-md p-[5px]" onClick={addToCart}>Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;
