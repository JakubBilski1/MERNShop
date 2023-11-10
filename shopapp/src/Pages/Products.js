import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Products(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [filters, setFilters] = useState({
    brandsChecked: [],
    sportsmanChecked: [],
    pricesData: [1, 100000], // Domyślne wartości
  });
  const [filteredData, setFilteredData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChangeFilter = (filterType, filterValue, isChecked) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (isChecked) {
        updatedFilters[filterType] = [...updatedFilters[filterType], filterValue];
      } else {
        updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== filterValue);
      }
      return updatedFilters;
    });
  };

  const handleChangeNum = (e) => {
    const num1 = parseFloat(e.target.form.from.value) || 1;
    const num2 = parseFloat(e.target.form.to.value) || 100000;
    setFilters((prevFilters) => ({ ...prevFilters, pricesData: [num1, num2] }));
  };

  const fetchData = () => {
    axios
      .post('http://localhost:5000/products/query', filters)
      .then((res) => {
        setFilteredData(res.data);
        if (res.data.length === 0) {
          setErrorMsg('No products found');
        } else {
          setErrorMsg('');
        }
      })
      .catch((err) => setErrorMsg('No products found'));
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
      <main className="flex justify-between" style={{ background: '#4d4d4d' }}>
        :D
        <div className="flex flex-col gap-[20px] w-[15%] bg-gray-800 p-[20px] fixed h-full">
          <h1 className="text-white text-4xl">Filters</h1>
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-white text-xl">Brand</h2>
            <form>
              {[...new Set(props.data.map(item => item.brand))].map((brand, index) => (
                <div key={index} className="flex items-center gap-[10px]">
                  <label className="text-white flex gap-[5px]">
                    <input type="checkbox" name={brand} id={`checkbox_${index}`} onChange={(e) => handleChangeFilter('brandsChecked', brand, e.target.checked)} disabled={isDisabled}/>
                    {brand}
                  </label>
                </div>
              ))}
            </form>
          </div>
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-white text-xl">Sportowcy</h2>
            <form>
              {[...new Set(props.data.map(item => item.sportsman))].map((sportsman, index) => (
                <div key={index} className="flex items-center gap-[10px]">
                  <label className="text-white flex gap-[5px]">
                    <input type="checkbox" name={sportsman} id={`checkbox_${index}`} onChange={e=>handleChangeFilter('sportsmanChecked', sportsman, e.target.checked)} disabled={isDisabled}/>
                    {sportsman}
                  </label>
                </div>
              ))}
            </form>
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
          {errorMsg && <p className="text-white">{errorMsg}</p>}
        </div>
        <div className="flex flex-wrap gap-[30px] items-center justify-center p-[50px] w-[85%]">
          {filteredData.length !== 0 ? filteredData.map((item) => {
            return (
              <Link to={`/products/p/${item.shortName}`} key={item.id} className="flex flex-col w-[250px] h-[450px]">
                <div>
                  <img src={`/Images/${item.image}`} alt={item.title} className="w-[250px] h-[300px]" />
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
