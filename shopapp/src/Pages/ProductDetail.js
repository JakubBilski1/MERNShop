import axios from 'axios';
import { useState, useEffect } from 'react';

function ProductDetail(props) {
  const [product, setProduct] = useState();
  
  useEffect(() => {
    const shortName = props.shortName;
    axios
      .post(`http://localhost:5000/products/p/${shortName}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [props.shortName]);

  return (
    <div className="bg-gray-900 text-white p-4">
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
            <p className="mb-2">Just {product.howMany} pieces left</p>
          </div>
        </div>
      }
    </div>
  );
}

export default ProductDetail;
