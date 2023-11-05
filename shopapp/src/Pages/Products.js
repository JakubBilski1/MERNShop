import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Products(props) {
  const [brandsChecked, setBrandsChecked] = useState([])
  const [sportsmanChecked, setSportsmanChecked] = useState([])
  const [pricesData, setPricesData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const errorMsg = [{error: 'No products found'}]
  const handleChangeBrand = (e) => {
    e.target.checked ? setBrandsChecked([...brandsChecked, e.target.name]) : setBrandsChecked(brandsChecked.filter(item => item !== e.target.name))
  }
  const handleChangeSportsman = (e) => {
    e.target.checked ? setSportsmanChecked([...sportsmanChecked, e.target.name]) : setSportsmanChecked(sportsmanChecked.filter(item => item !== e.target.name))
  }
  const handleChangeNum = (e) => {
    const num1 = parseFloat(e.target.form[0].value)
    const num2 = parseFloat(e.target.form[1].value)
    num1 && num2 ? setPricesData([num1, num2]) : setPricesData([])
  }
  axios.post('http://localhost:5000/products/query', { brandsChecked, sportsmanChecked, pricesData, errorMsg })
  .then((res) => setFilteredData(res.data))
  .catch((err) => console.log(err));
  return (
      <main className="flex justify-between" style={{ background: '#4d4d4d' }}>
        {/* dodaj tutaj panel ktory bedzie znajdowal sie po lewej stronie ekranu ma on byc wysoki na cala dlugosc i szeroki na 25%, zmien szerokosc diva z produktami na 75%, ma on takze byc przyklejony do ekranu i nie ma sie scrollowac z ekranem */}:
        <div className="flex flex-col gap-[20px] w-[15%] h-[100%] bg-gray-800 p-[20px] fixed bottom-0">
          <h1 className="text-white text-4xl">Filters</h1>
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-white text-xl">Brand</h2>
            <div>
              {[...new Set(props.data.map(item => item.brand))].map((brand, index) => (
                <form key={index} className="flex items-center gap-[10px]">
                  <label className="text-white flex gap-[5px]">
                    <input type="checkbox" name={brand} id={`checkbox_${index}`} onChange={e=>handleChangeBrand(e)}/>
                    {brand}
                  </label>
                </form>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-white text-xl">Sportowcy</h2>
            <div>
              {[...new Set(props.data.map(item => item.sportsman))].map((sportsman, index) => (
                <form key={index} className="flex items-center gap-[10px]">
                  <label className="text-white flex gap-[5px]">
                    <input type="checkbox" name={sportsman} id={`checkbox_${index}`} onChange={e=>handleChangeSportsman(e)}/>
                    {sportsman}
                  </label>
                </form>
              ))}
            </div>
          </div>
          <form className="flex flex-col gap-[10px]">
            <label htmlFor="from" className='text-white'>Cena od:</label>
            <div className="text-white flex gap-[5px]">
              <input type="number" id="from" className="w-[70%] text-black" onChange={e=>handleChangeNum(e)}/>zł
            </div>
            <label htmlFor="to" className='text-white'>Cena do:</label>
            <div className="text-white flex gap-[5px]">
              <input type="number" id="to" className="w-[70%] text-black" onChange={e=>handleChangeNum(e)}/>zł
            </div>
          </form>
          {/*filteredData.length === 0 && pricesData.length !==0 && <h1 className="text-white text-4xl">No products found</h1>*/}
        </div>
        <div className="flex flex-wrap gap-[30px] items-center justify-center p-[50px] w-[85%]">
          {filteredData.length !== 0 ? filteredData.map((item) => {
            return (
              <Link to={`/products/p/${item.shortName}`} key={item.id} className="flex flex-col w-[250px] h-[450px]">
                <div>
                  <img src={`https://gymbrothers.pl/productImages/${item.image}`} alt={item.title} className="w-[250px] h-[300px]" />
                </div>
                <div className="bg-gray-700 flex flex-col h-[100%] rounded-b-2xl p-[10px]">
                  <h2 className="text-2xl text-white">{item.title}</h2>
                  <p className="text-white">{item.brand}</p>
                  <p className="text-white">{item.price}zł</p>
                </div>
              </Link>
            )
          }) : props.data.map((item) => {
            return (
              <Link to={`/products/p/${item.shortName}`} key={item.id} className="flex flex-col w-[250px] h-[450px]">
                <div>
                  <img src={`https://gymbrothers.pl/productImages/${item.image}`} alt={item.title} className="w-[250px] h-[300px]" />
                </div>
                <div className="bg-gray-700 flex flex-col h-[100%] rounded-b-2xl p-[10px]">
                  <h2 className="text-2xl text-white">{item.title}</h2>
                  <p className="text-white">{item.brand}</p>
                  <p className="text-white">{item.price}zł</p>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
  );
}

export default Products;
