import React from 'react'
import { Link } from 'react-router-dom'

function MostPopularProducts(props) {
  return (
    <>
      <div className="flex flex-col gap-[40px]">
          <h1 className="text-center text-white text-4xl">Most popular</h1>
          <div className="flex gap-[80px] justify-around">
            {props.data.sort((a, b) => b.popularity_level - a.popularity_level).slice(0, 4).map((item) => {
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
            })}
          </div>
        </div>
    </>
  )
}

export default MostPopularProducts
