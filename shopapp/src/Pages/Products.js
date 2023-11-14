import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FiltersSideBar from '../Components//Products/FiltersSideBar';
import { getFilteredProducts } from '../Services/ProductsService';

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
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== filterValue
        );
      }
      return updatedFilters;
    });
  };
  
  const handleChangeNum = (e) => {
      const num1 = parseFloat(e.target.form.from.value) || 1;
      const num2 = parseFloat(e.target.form.to.value) || 100000;
      setFilters((prevFilters) => ({ ...prevFilters, pricesData: [num1, num2] }));
  };

  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await getFilteredProducts(filters)
        setFilteredData(response)
        console.log(response)
        if(response.length === 0){
          setErrorMsg('No products found')
        }
      }catch(err){
        console.log(err)
        setErrorMsg('No products found')
      }
    }
    fetchData();
  }, [filters]);

  return (
      <main className="flex justify-between" style={{ background: '#4d4d4d' }}>
        :D
        <FiltersSideBar data={props.data} handleChangeFilter={handleChangeFilter} handleChangeNum={handleChangeNum} errorMsg={errorMsg} isDisabled={isDisabled} />
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
