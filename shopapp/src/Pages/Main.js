import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

function Main() {
    const [data, setData] = useState({})
    useEffect(() => {
      const num = Math.floor(Math.random() * 20) + 1
      axios.post(`http://localhost:5000/products/id/${num}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }, [])
    return (
      <main className="flex items-center justify-center bg-gray-800 p-[50px]">
        <div className="bg-gray-700 text-white p-8 rounded-lg shadow-xl w-5/6 lg:w-2/3 xl:w-1/2">
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
              <p className="text-yellow-400 font-semibold text-3xl">${data.price}</p>
            </div>
          </div>
        </div>
      </main>
    );
       
}

export default Main