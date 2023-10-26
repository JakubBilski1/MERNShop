import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Main() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.post('http://localhost:5000/products')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [])
  console.log(data)
  return (
    <main className="flex flex-wrap gap-[30px] items-center justify-center p-[20px]" style={{background: '#4d4d4d'}}>
      {data.map((item) => {
        return (
          <div key={item.id} className="flex flex-col w-[250px] h-[450px]">
            <div>
              <img src={`https://gymbrothers.pl/productImages/${item.image}`} alt={item.title} className="w-[250px] h-[300px]" />
            </div>
            <div className="bg-gray-700 flex flex-col h-[100%] rounded-b-2xl p-[10px]">
              <h2 className="text-2xl text-white">{item.title}</h2>
              <p className="text-white">{item.brand}</p>
              <p className="text-white">{item.price}</p>
            </div>
          </div>
        )
      })}
    </main>
  )
}

export default Main
