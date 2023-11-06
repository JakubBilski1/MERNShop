import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Main(props) {
    const [data, setData] = useState({})
    useEffect(() => {
      const num = Math.floor(Math.random() * 20) + 1
      axios.post(`http://localhost:5000/products/id/${num}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }, [])
    return (
      <div className="flex items-center justify-center flex-col bg-gray-800 p-[50px] gap-[20px]">
        {data ? <Link to={`/products/p/${data.shortName}`} className="bg-gray-700 text-white p-8 rounded-lg shadow-xl w-5/6 lg:w-2/3 xl:w-1/2">
          <div className="flex">
            <div className="w-1/3">
              <img
                src={`https://gymbrothers.pl/productImages/${data.image}`}
                alt={data.title}
                className="w-full rounded-lg"
              />
            </div>
            <div className="w-2/3 ml-4">
              <h2 className="text-4xl font-semibold">{data.title}</h2>
              <p className="text-gray-400 text-lg">{data.brand}</p>
              <p className="text-yellow-400 font-semibold text-3xl">{data.price}zł</p>
              <p>{data.description}</p>
            </div>
          </div>
        </Link> : <h1>You have no internet connection</h1>}
        <div className="flex flex-col gap-[40px]">
          <h1 className="text-center text-white text-4xl">Most popular</h1>
          <div className="flex gap-[80px] justify-around">
            {props.data.sort((a, b) => b.popularity_level - a.popularity_level).slice(0, 4).map((item) => {
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
        </div>
      </div>
    ); 
}

export default Main