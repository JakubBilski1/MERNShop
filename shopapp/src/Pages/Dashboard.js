import React from 'react'
import axios from 'axios'

function Dashboard() {
    axios.get('http://localhost:5000/u/dashboard', {withCredentials: true})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  return (
    <div>
      
    </div>
  )
}

export default Dashboard
