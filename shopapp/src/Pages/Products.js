import React from 'react'
import { Link } from 'react-router-dom'

function Products(props) {
  return (
    <main className="flex flex-wrap gap-[30px] items-center justify-center p-[20px]" style={{background: '#4d4d4d'}}>
      {props.data.map((item) => {
        return (
          <Link to={`/products/p/${item.shortName}`} key={item.id} className="flex flex-col w-[250px] h-[450px]">
            <div>
              <img src={`https://gymbrothers.pl/productImages/${item.image}`} alt={item.title} className="w-[250px] h-[300px]" />
            </div>
            <div className="bg-gray-700 flex flex-col h-[100%] rounded-b-2xl p-[10px]">
              <h2 className="text-2xl text-white">{item.title}</h2>
              <p className="text-white">{item.brand}</p>
              <p className="text-white">{item.price}</p>
            </div>
          </Link>
        )
      })}
    </main>
  )
}

export default Products
