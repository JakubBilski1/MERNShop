import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

function Main() {
    const [data, setData] = useState([])
    useEffect(() => {
      const num = Math.floor(Math.random() * 20) + 1
      axios.post(`http://localhost:5000/products/${num}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }, [])
    console.log(data)
  return (
    <main>
        {data.title}
    </main>
  )
}

export default Main
