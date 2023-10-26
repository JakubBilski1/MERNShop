import './index.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Pages/Main';
import Products from './Pages/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<Products />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

