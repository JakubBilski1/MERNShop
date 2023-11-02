import axios from 'axios';
import { useState, useEffect } from 'react';

function ProductDetail(props) {
    const [product, setProduct] = useState();
    useEffect(() => {
        const shortName = props.shortName;
        axios.post(`http://localhost:5000/products/p/${shortName}`)
        .then(res => setProduct(res.data))
        .catch(err => console.log(err))
    }, [])
  return (
    <div>
      {product && 
        <div>
            <h2>{product.title}</h2>
            <p>{product.brand}</p>
            <p>{product.price}</p>
        </div>
      }
    </div>
  );
}

export default ProductDetail;
