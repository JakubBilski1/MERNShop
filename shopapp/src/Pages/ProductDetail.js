import axios from 'axios';
import { useState, useEffect } from 'react';

function ProductDetail(props) {
  const [product, setProduct] = useState();
  const [count, setCount] = useState(0);
  
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

  return (
    <div className="bg-gray-900 text-white p-4 h-full">
      {product &&
        <div className="flex">
          <div className="w-1/2">
            <img src={`https://gymbrothers.pl/productImages/${product.image}`} alt={product.title} />
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
                  <button key={index} className="bg-gray-600 px-[25px] py-[10px]" >{size[0]} <span className="text-gray-400">({size[1]})</span></button>
                )
              })}
            </div>
            <p>Currently in stock: {count}</p>
          </div>
        </div>
      }
    </div>
  );
}

export default ProductDetail;
