import React from 'react'
import { getRandomProduct } from '../../Services/ProductsService'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function RandomProduct(props) {
  const [data, setData] = useState({})
  useEffect(() => {
    const fetchRandomProduct = async () => {
      try{
        const num = Math.floor(Math.random() * 20) + 1
        const response = await getRandomProduct(num)
        setData(response)
      }catch(err){
        console.log(err)
      }
    }
    fetchRandomProduct()
  }, [])
  return (
    <>
      {data ? <Link to={`/products/p/${data.shortName}`} className="bg-gray-700 text-white p-8 rounded-lg shadow-xl w-5/6 lg:w-2/3 xl:w-1/2">
          <div className="flex">
            <div className="w-1/3">
              <img
                src={`/Images/${data.image}`}
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
    </>
  )
}

export default RandomProduct
