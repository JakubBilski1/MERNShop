import './index.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Pages/Main';
import Products from './Pages/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './Pages/About';
import Contact from './Pages/Contact';
import NotFoundPage from './Pages/NotFoundPage';
import axios from 'axios'
import { useState, useEffect } from 'react'
import ProductDetail from './Pages/ProductDetail';
import { useParams } from 'react-router-dom';

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.post('http://localhost:5000/products')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [])
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main data={data}/>} />
          <Route path="/products" element={<Products data={data}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='*' element={<NotFoundPage />}/>
          <Route path={`/products/p/:shortName`} element={<ProductDetailWrapper />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function ProductDetailWrapper(){
  const { shortName } = useParams();
  return <ProductDetail shortName={shortName} />
}

export default App;

