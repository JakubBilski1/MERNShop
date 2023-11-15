import './index.css';
import Header from './Components/Structure/Header/Header';
import Footer from './Components/Structure/Footer';
import Main from './Pages/Main';
import Products from './Pages/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './Pages/About';
import Contact from './Pages/Contact';
import NotFoundPage from './Pages/NotFoundPage';
import { useState, useEffect } from 'react'
import ProductDetail from './Pages/ProductDetail';
import { useParams } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Cart from './Pages/Cart';
import { getProducts } from './Services/ProductsService';
import { getUser } from './Services/UserDataService';
import { getSocket } from './Services/getSocket';

function App() {
  const [data, setData] = useState([])
  const [user, setUser] = useState([])
  //const [cart, setCart] = useState([])
  const socket = getSocket()
  useEffect(() => {
    const fetchData = async () => {
      try{
        const productsResponse = await getProducts()
        setData(productsResponse)

        socket.on('connect', () => {
          console.log('connected')
        })

        // socket.emit('get-cart')

        // socket.on('cart', (cart) => {
        //   console.log(cart)
        //   setCart(cart)
        // })

        const userResponse = await getUser()
        setUser(userResponse)

        //const responseCart = await getCart()
        //setCart(responseCart)
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [])
  function ProductDetailWrapper(){
    const { shortName } = useParams();
    return <ProductDetail shortName={shortName}/>
  }

  return (
    <Router>
      <div className="App">
        <Header data={user ? user : []}/>
        <main className="main">
          <Routes>
            <Route path="/" element={data.length>0 ? <Main data={data}/> : <p>Loading...</p>} />
            <Route path="/products" element={data.length>0 ? <Products data={data}/> : <p>Loading...</p>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='*' element={<NotFoundPage />}/>
            <Route path={`/products/p/:shortName`} element={<ProductDetailWrapper />}/>
            <Route path={`/login`} element={<Login />}/>
            <Route path={'/register'} element={<Register />}/>
            <Route path={'/u/dashboard'} element={<Dashboard />}/>
            <Route path={'/cart'} element={<Cart />}/>
            {/* <Route path={'/cart'} element={<Cart cart={cart}/>}/> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

