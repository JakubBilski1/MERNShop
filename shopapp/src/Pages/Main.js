import React from 'react'
import RandomProduct from '../Components/Main/RandomProduct'
import MostPopularProducts from '../Components/Main/MostPopularProducts';

function Main(props) {
    return (
      <div className="flex items-center justify-center flex-col bg-gray-800 p-[50px] gap-[20px]">
        <RandomProduct />
        <MostPopularProducts data={props.data} />
      </div>
    ); 
}

export default Main